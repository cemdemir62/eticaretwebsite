import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaUser, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import DataService from '../services/DataService'

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
`

const LoginTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #ff4500;
  }
`

const LoginForm = styled.form`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  
  &:focus-within {
    border-color: #ff4500;
  }
`

const InputIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  background-color: #f5f5f5;
  color: #777;
  height: 48px;
`

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 12px 15px;
  font-size: 16px;
  outline: none;
`

const SubmitButton = styled.button`
  width: 100%;
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: #e03e00;
  }
`

const ForgotPassword = styled.div`
  text-align: right;
  margin-bottom: 20px;
  
  a {
    color: #777;
    font-size: 14px;
    
    &:hover {
      color: #ff4500;
    }
  }
`

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #777;
  
  a {
    color: #ff4500;
    font-weight: 500;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const ErrorMessage = styled.div`
  background-color: #fff0f0;
  color: #e74c3c;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
`

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basit doğrulama
    if (!formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurun')
      return
    }
    
    // DataService ile kullanıcı doğrulama
    const user = DataService.authenticateUser(formData.email, formData.password)
    
    if (user) {
      // Başarılı giriş
      setIsLoggedIn(true)
      
      // Kullanıcı rolüne göre yönlendirme
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      setError('Geçersiz e-posta veya şifre')
    }
  }
  
  return (
    <LoginContainer>
      <LoginTitle>
        <FaUser /> Giriş Yap
      </LoginTitle>
      
      <LoginForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="email">E-posta Adresi</Label>
          <InputGroup>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="E-posta adresinizi girin"
              value={formData.email}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Şifre</Label>
          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Şifrenizi girin"
              value={formData.password}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FormGroup>
        
        <ForgotPassword>
          <Link to="/forgot-password">Şifremi Unuttum</Link>
        </ForgotPassword>
        
        <SubmitButton type="submit">
          <FaSignInAlt /> Giriş Yap
        </SubmitButton>
        
        <RegisterLink>
          Hesabınız yok mu?<Link to="/register">Kayıt Ol</Link>
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  )
}

export default LoginPage