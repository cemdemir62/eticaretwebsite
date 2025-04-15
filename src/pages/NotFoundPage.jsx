import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa'

const NotFoundContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`

const NotFoundIcon = styled.div`
  font-size: 5rem;
  color: #ff4500;
  margin-bottom: 20px;
`

const NotFoundTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`

const NotFoundText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const StyledButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: ${props => props.primary ? '#ff4500' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.primary ? '#e03e00' : '#e9e9e9'};
  }
  
  svg {
    margin-right: 8px;
  }
`

function NotFoundPage() {
  return (
    <NotFoundContainer>
      <NotFoundIcon>
        <FaExclamationTriangle />
      </NotFoundIcon>
      <NotFoundTitle>Sayfa Bulunamadı</NotFoundTitle>
      <NotFoundText>
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        Lütfen ana sayfaya dönün veya başka bir sayfaya gidin.
      </NotFoundText>
      
      <ButtonContainer>
        <StyledButton to="/" primary>
          <FaHome /> Ana Sayfaya Dön
        </StyledButton>
        <StyledButton to="/products">
          <FaArrowLeft /> Ürünlere Git
        </StyledButton>
      </ButtonContainer>
    </NotFoundContainer>
  )
}

export default NotFoundPage