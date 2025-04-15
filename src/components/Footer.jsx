import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa'

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 50px 0 20px;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #ff4500;
`

const FooterLink = styled(Link)`
  color: #ccc;
  margin-bottom: 10px;
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4500;
  }
`

const SocialIcons = styled.div`
  display: flex;
  margin-top: 15px;
`

const SocialIcon = styled.a`
  color: #fff;
  font-size: 20px;
  margin-right: 15px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4500;
  }
`

const PaymentMethods = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`

const PaymentIcon = styled.div`
  color: #fff;
  font-size: 24px;
  margin-right: 15px;
  margin-bottom: 10px;
`

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #999;
  font-size: 14px;
`

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 15px;
`

const NewsletterInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px 0 0 4px;
  flex: 1;
  font-size: 14px;
`

const NewsletterButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e03e00;
  }
`

function Footer() {
  const currentYear = new Date().getFullYear()
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Bülten kaydı işlemi burada yapılacak
    alert('Bültenimize kaydınız alındı!')
    e.target.reset()
  }
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>Kurumsal</FooterTitle>
          <FooterLink to="/about">Hakkımızda</FooterLink>
          <FooterLink to="/careers">Kariyer</FooterLink>
          <FooterLink to="/contact">İletişim</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Müşteri Hizmetleri</FooterTitle>
          <FooterLink to="/faq">Sıkça Sorulan Sorular</FooterLink>
          <FooterLink to="/shipping">Kargo ve Teslimat</FooterLink>
          <FooterLink to="/returns">İade ve Değişim</FooterLink>
          <FooterLink to="/privacy">Gizlilik Politikası</FooterLink>
          <FooterLink to="/terms">Kullanım Koşulları</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Hesabım</FooterTitle>
          <FooterLink to="/login">Giriş Yap</FooterLink>
          <FooterLink to="/register">Üye Ol</FooterLink>
          <FooterLink to="/profile">Hesap Bilgilerim</FooterLink>
          <FooterLink to="/orders">Siparişlerim</FooterLink>
          <FooterLink to="/favorites">Favorilerim</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Bülten</FooterTitle>
          <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '15px' }}>
            Kampanyalardan haberdar olmak için bültenimize abone olun.
          </p>
          
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput type="email" placeholder="E-posta adresiniz" required />
            <NewsletterButton type="submit">Abone Ol</NewsletterButton>
          </NewsletterForm>
          
          <SocialIcons>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialIcon>
          </SocialIcons>
          
          <FooterTitle style={{ marginTop: '20px' }}>Ödeme Yöntemleri</FooterTitle>
          <PaymentMethods>
            <PaymentIcon><FaCreditCard /></PaymentIcon>
            <PaymentIcon><FaPaypal /></PaymentIcon>
            <PaymentIcon><FaApplePay /></PaymentIcon>
            <PaymentIcon><FaGooglePay /></PaymentIcon>
          </PaymentMethods>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} E-Ticaret. Tüm hakları saklıdır.
      </Copyright>
    </FooterContainer>
  )
}

export default Footer