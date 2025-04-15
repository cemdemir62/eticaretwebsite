import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa'

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const ProductImageContainer = styled.div`
  position: relative;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background-color: #f9f9f9;
  overflow: hidden;
`

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const ProductBadges = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const ProductActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ActionButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(20px);
  
  &:hover {
    background-color: #ff4500;
    color: white;
  }
  
  ${Card}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
  
  &:nth-child(2) {
    transition-delay: 0.05s;
  }
  
  &:nth-child(3) {
    transition-delay: 0.1s;
  }
`

const ProductInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ProductCategory = styled.span`
  font-size: 12px;
  color: #777;
  margin-bottom: 5px;
`

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff4500;
    }
  }
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Stars = styled.div`
  display: flex;
  color: #ffc107;
  margin-right: 5px;
`

const ReviewCount = styled.span`
  font-size: 12px;
  color: #777;
`

const ProductPrices = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: 15px;
`

const CurrentPrice = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #ff4500;
`

const OldPrice = styled.span`
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
`

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: #e03e00;
  }
`

function ProductCard({ product, addToCart }) {
  const { id, name, price, oldPrice, image, rating, reviewCount, isNew, isSale, category = 'Elektronik' } = product
  
  return (
    <Card>
      <ProductImageContainer>
        <ProductImage src={image} alt={name} />
        
        <ProductBadges>
          {isNew && <span className="badge badge-new">Yeni</span>}
          {isSale && <span className="badge badge-sale">İndirim</span>}
        </ProductBadges>
        
        <ProductActions>
          <ActionButton title="Favorilere Ekle">
            <FaHeart />
          </ActionButton>
          <ActionButton title="Hızlı Bakış">
            <FaEye />
          </ActionButton>
        </ProductActions>
      </ProductImageContainer>
      
      <ProductInfo>
        <ProductCategory>{category}</ProductCategory>
        <ProductName>
          <Link to={`/products/${id}`}>{name}</Link>
        </ProductName>
        
        <ProductRating>
          <Stars>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < Math.floor(rating) ? '#ffc107' : '#e4e5e9'} />
            ))}
          </Stars>
          <ReviewCount>({reviewCount} değerlendirme)</ReviewCount>
        </ProductRating>
        
        <ProductPrices>
          <CurrentPrice>{price.toLocaleString('tr-TR')} ₺</CurrentPrice>
          {oldPrice && <OldPrice>{oldPrice.toLocaleString('tr-TR')} ₺</OldPrice>}
        </ProductPrices>
        
        <AddToCartButton onClick={() => addToCart(product)}>
          <FaShoppingCart /> Sepete Ekle
        </AddToCartButton>
      </ProductInfo>
    </Card>
  )
}

export default ProductCard