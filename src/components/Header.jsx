import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa'

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #ff4500;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 15px;
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
  
  @media (max-width: 768px) {
    display: ${({ isMobileSearchVisible }) => isMobileSearchVisible ? 'flex' : 'none'};
    position: ${({ isMobileSearchVisible }) => isMobileSearchVisible ? 'absolute' : 'static'};
    top: 70px;
    left: 20px;
    right: 20px;
    margin: 0;
    z-index: 1000;
  }
`

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  margin-left: 10px;
  font-size: 14px;
`

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${({ isMobileMenuOpen }) => isMobileMenuOpen ? 'flex' : 'none'};
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
`

const NavLink = styled(Link)`
  margin-left: 20px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #ff4500;
  }
  
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`

const CartBadge = styled.span`
  background-color: #ff4500;
  color: white;
  font-size: 10px;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -8px;
  right: -8px;
`

const CartIcon = styled.div`
  position: relative;
`

const MobileIcons = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`

const MobileIcon = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Header({ isLoggedIn, cartItemCount, toggleCart }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false)
  const navigate = useNavigate()
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
      setSearchQuery('')
      setIsMobileSearchVisible(false)
    }
  }
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">E-Ticaret</Logo>
        
        <SearchBar 
          as="form" 
          onSubmit={handleSearch}
          isMobileSearchVisible={isMobileSearchVisible}
        >
          <FaSearch />
          <SearchInput 
            type="text" 
            placeholder="Ürün, kategori veya marka ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        
        <NavLinks isMobileMenuOpen={isMobileMenuOpen}>
          <NavLink to="/">Ana Sayfa</NavLink>
          <NavLink to="/products">Ürünler</NavLink>
          <NavLink to="/products?category=kampanyalar">Kampanyalar</NavLink>
          
          {isLoggedIn ? (
            <>
              <NavLink to="/profile">
                <FaUser style={{ marginRight: '5px' }} />
                Hesabım
              </NavLink>
              <NavLink to="/admin">
                <FaCog style={{ marginRight: '5px' }} />
                Yönetici Paneli
              </NavLink>
            </>
          ) : (
            <NavLink to="/login">
              <FaUser style={{ marginRight: '5px' }} />
              Giriş Yap
            </NavLink>
          )}
          
          <NavLink to="/cart" onClick={(e) => {
            e.preventDefault()
            toggleCart()
          }}>
            <CartIcon>
              <FaShoppingCart />
              {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
            </CartIcon>
            Sepetim
          </NavLink>
        </NavLinks>
        
        <MobileIcons>
          <MobileIcon onClick={() => setIsMobileSearchVisible(!isMobileSearchVisible)}>
            <FaSearch />
          </MobileIcon>
          
          <MobileIcon onClick={() => toggleCart()}>
            <CartIcon>
              <FaShoppingCart />
              {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
            </CartIcon>
          </MobileIcon>
          
          <MobileIcon onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileIcon>
        </MobileIcons>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header