import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingCart } from 'react-icons/fa'

const CartContainer = styled.div`
  padding: ${({ isPreview }) => (isPreview ? '15px' : '0')};
`

const CartTitle = styled.h2`
  font-size: ${({ isPreview }) => (isPreview ? '1.5rem' : '2rem')};
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #ff4500;
  }
`

const EmptyCart = styled.div`
  text-align: center;
  padding: 30px 0;
`

const EmptyCartIcon = styled.div`
  font-size: 3rem;
  color: #ddd;
  margin-bottom: 15px;
`

const EmptyCartText = styled.p`
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 20px;
`

const CartItems = styled.div`
  margin-bottom: 20px;
`

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
  }
`

const ItemInfo = styled.div`
  flex: 1;
`

const ItemName = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
`

const ItemPrice = styled.div`
  font-weight: 600;
  color: #ff4500;
`

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-end;
  }
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  
  @media (max-width: 576px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`

const QuantityButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  
  &:hover {
    background-color: #e0e0e0;
  }
`

const QuantityInput = styled.span`
  width: 40px;
  text-align: center;
  font-weight: 500;
`

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  
  &:hover {
    color: #ff4500;
  }
`

const CartSummary = styled.div`
  background-color: ${({ isPreview }) => (isPreview ? 'transparent' : '#f9f9f9')};
  border-radius: 8px;
  padding: ${({ isPreview }) => (isPreview ? '0' : '20px')};
  margin-top: 20px;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
  
  &:last-child {
    margin-top: 15px;
    margin-bottom: 0;
    padding-top: 15px;
    border-top: 1px solid #eee;
    font-size: 1.1rem;
    font-weight: 600;
  }
`

const CheckoutButton = styled(Link)`
  display: block;
  background-color: #ff4500;
  color: white;
  text-align: center;
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e03e00;
  }
`

const ContinueShoppingLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #555;
  margin-top: 20px;
  font-size: 0.9rem;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    color: #ff4500;
  }
`

function CartPage({ cart = [], removeFromCart, updateQuantity, isPreview = false }) {
  // Sepet toplamını hesaplama
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
  
  const subtotal = calculateSubtotal()
  const shipping = subtotal > 0 ? (subtotal > 150 ? 0 : 15) : 0
  const total = subtotal + shipping
  
  return (
    <CartContainer isPreview={isPreview}>
      <CartTitle isPreview={isPreview}>
        <FaShoppingCart /> Sepetim
      </CartTitle>
      
      {cart.length === 0 ? (
        <EmptyCart>
          <EmptyCartIcon>
            <FaShoppingCart />
          </EmptyCartIcon>
          <EmptyCartText>Sepetiniz şu anda boş</EmptyCartText>
          {!isPreview && (
            <Link to="/products" className="btn btn-primary">
              Alışverişe Başla
            </Link>
          )}
        </EmptyCart>
      ) : (
        <>
          <CartItems>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <ItemImage>
                  <img src={item.image} alt={item.name} />
                </ItemImage>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>{item.price.toFixed(2)} TL</ItemPrice>
                </ItemInfo>
                <ItemActions>
                  <QuantityControl>
                    <QuantityButton 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </QuantityButton>
                    <QuantityInput>{item.quantity}</QuantityInput>
                    <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <FaPlus />
                    </QuantityButton>
                  </QuantityControl>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                  </RemoveButton>
                </ItemActions>
              </CartItem>
            ))}
          </CartItems>
          
          <CartSummary isPreview={isPreview}>
            <SummaryRow>
              <span>Ara Toplam:</span>
              <span>{subtotal.toFixed(2)} TL</span>
            </SummaryRow>
            <SummaryRow>
              <span>Kargo:</span>
              <span>
                {shipping === 0 ? 'Ücretsiz' : `${shipping.toFixed(2)} TL`}
              </span>
            </SummaryRow>
            <SummaryRow>
              <span>Toplam:</span>
              <span>{total.toFixed(2)} TL</span>
            </SummaryRow>
          </CartSummary>
          
          {!isPreview && (
            <>
              <CheckoutButton to="/checkout">Siparişi Tamamla</CheckoutButton>
              <ContinueShoppingLink to="/products">
                <FaArrowLeft /> Alışverişe Devam Et
              </ContinueShoppingLink>
            </>
          )}
          
          {isPreview && (
            <CheckoutButton to="/cart">Sepete Git</CheckoutButton>
          )}
        </>
      )}
    </CartContainer>
  )
}

export default CartPage