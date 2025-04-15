import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import styled from 'styled-components'

// Sayfalar
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

// Bileşenler
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  padding-top: 80px; // Header yüksekliği
`

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
`

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Sepete ürün ekleme fonksiyonu
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    
    setIsCartOpen(true)
  }
  
  // Sepetten ürün çıkarma fonksiyonu
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }
  
  // Ürün miktarını güncelleme fonksiyonu
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ))
  }
  
  return (
    <AppContainer>
      <Header 
        isLoggedIn={isLoggedIn} 
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />
      
      <MainContent>
        <Sidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen}>
          <CartPage 
            cart={cart} 
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            isPreview={true}
          />
        </Sidebar>
        
        <ContentArea>
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/products/:id" element={<ProductDetailPage addToCart={addToCart} />} />
            <Route path="/admin" element={isLoggedIn ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/cart" element={
              <CartPage 
                cart={cart} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            } />
            <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ContentArea>
      </MainContent>
      
      <Footer />
    </AppContainer>
  )
}

export default App