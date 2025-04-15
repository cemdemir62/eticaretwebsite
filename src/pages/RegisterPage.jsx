import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaUser, FaLock, FaEnvelope, FaUserPlus, FaPhone } from 'react-icons/fa'

const RegisterContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
`

const RegisterTitle = styled.h2`
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

const RegisterForm = styled.form`
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

const LoginLink = styled.div`
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

const SuccessMessage = styled.div`
  background-color: #f0fff0;
  color: #27ae60;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
`

function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
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
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm zorunlu alanları doldurun')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }
    
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }
    
    // Gerçek bir uygulamada burada API çağrısı yapılır
    // Örnek kayıt işlemi
    setError('')
    setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...')
    
    // 2 saniye sonra giriş sayfasına yönlendir
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
  
  return (
    <RegisterContainer>
      <RegisterTitle>
        <FaUserPlus /> Kayıt Ol
      </RegisterTitle>
      
      <RegisterForm onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <FormGroup>
          <Label htmlFor="fullName">Ad Soyad</Label>
          <InputGroup>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input 
              type="text" 
              id="fullName" 
              name="fullName" 
              placeholder="Adınızı ve soyadınızı girin"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">E-posta Adresi</Label>
          <InputGroup>
            <InputIcon>
              <FaEnvelope />
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
          <Label htmlFor="phone">Telefon (İsteğe Bağlı)</Label>
          <InputGroup>
            <InputIcon>
              <FaPhone />
            </InputIcon>
            <Input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="Telefon numaranızı girin"
              value={formData.phone}
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
        
        <FormGroup>
          <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Şifrenizi tekrar girin"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FormGroup>
        
        <SubmitButton type="submit">
          <FaUserPlus /> Kayıt Ol
        </SubmitButton>
        
        <LoginLink>
          Zaten hesabınız var mı?<Link to="/login">Giriş Yap</Link>
        </LoginLink>
      </RegisterForm>
    </RegisterContainer>
  )
}

export default RegisterPage