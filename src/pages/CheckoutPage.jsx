import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCreditCard, FaMoneyBill, FaShoppingBag } from 'react-icons/fa'

const CheckoutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
`

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const OrderSummary = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`

const SummaryItems = styled.div`
  margin-bottom: 20px;
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`

const SummaryItemName = styled.span`
  flex: 2;
`

const SummaryItemQuantity = styled.span`
  flex: 1;
  text-align: center;
`

const SummaryItemPrice = styled.span`
  flex: 1;
  text-align: right;
  font-weight: 500;
`

const SummaryTotal = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.1rem;
  
  &:last-child {
    font-weight: bold;
    font-size: 1.3rem;
    margin-top: 10px;
  }
`

const CheckoutForm = styled.form`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const FormSection = styled.div`
  margin-bottom: 25px;
`

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`

const InputGroup = styled.div`
  margin-bottom: 15px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`

const PaymentOptions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`

const PaymentOption = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ selected }) => selected && `
    border-color: #4a90e2;
    background-color: rgba(74, 144, 226, 0.1);
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  `}
  
  &:hover {
    border-color: #4a90e2;
  }
`

const PaymentIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #4a90e2;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background-color: #3a7bc8;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #4a90e2;
  }
`

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #f0f8f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const SuccessIcon = styled.div`
  font-size: 3rem;
  color: #4CAF50;
  margin-bottom: 20px;
`

const SuccessTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`

const SuccessText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: #555;
`

const OrderNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #e8f4e8;
  border-radius: 4px;
  display: inline-block;
`

function CheckoutPage({ cart = [] }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Türkiye',
  })
  
  const [paymentMethod, setPaymentMethod] = useState('creditCard')
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  // Sepet toplamını hesaplama
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
  
  const subtotal = calculateSubtotal()
  const shipping = subtotal > 0 ? (subtotal > 150 ? 0 : 15) : 0
  const total = subtotal + shipping
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Sipariş numarası oluştur
    const newOrderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(newOrderNumber)
    
    // Sipariş tamamlandı olarak işaretle
    setOrderComplete(true)
    
    // Gerçek bir uygulamada burada API çağrısı yapılır
    console.log('Sipariş verildi:', {
      orderNumber: newOrderNumber,
      customer: formData,
      items: cart,
      total,
      paymentMethod
    })
  }
  
  // Sepet boşsa checkout sayfasını gösterme
  if (cart.length === 0 && !orderComplete) {
    return (
      <CheckoutContainer>
        <CheckoutTitle>
          <FaShoppingBag /> Sipariş
        </CheckoutTitle>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <p>Sepetinizde ürün bulunmamaktadır.</p>
          <BackLink to="/products">
            <FaArrowLeft /> Alışverişe Devam Et
          </BackLink>
        </div>
      </CheckoutContainer>
    )
  }
  
  // Sipariş tamamlandıysa teşekkür mesajı göster
  if (orderComplete) {
    return (
      <CheckoutContainer>
        <SuccessMessage>
          <SuccessIcon>
            <FaShoppingBag />
          </SuccessIcon>
          <SuccessTitle>Siparişiniz Alındı!</SuccessTitle>
          <SuccessText>
            Siparişiniz başarıyla oluşturuldu. Sipariş detayları e-posta adresinize gönderildi.
          </SuccessText>
          <OrderNumber>Sipariş Numaranız: {orderNumber}</OrderNumber>
          <SubmitButton as={Link} to="/">
            Alışverişe Devam Et
          </SubmitButton>
        </SuccessMessage>
      </CheckoutContainer>
    )
  }
  
  return (
    <CheckoutContainer>
      <CheckoutTitle>
        <FaShoppingBag /> Sipariş Oluştur
      </CheckoutTitle>
      
      <CheckoutGrid>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Kişisel Bilgiler</SectionTitle>
            <InputGroup>
              <Label htmlFor="firstName">Ad</Label>
              <Input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleInputChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="lastName">Soyad</Label>
              <Input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="email">E-posta</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="phone">Telefon</Label>
              <Input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                required 
              />
            </InputGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>Teslimat Adresi</SectionTitle>
            <InputGroup>
              <Label htmlFor="address">Adres</Label>
              <Input 
                type="text" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="city">Şehir</Label>
              <Input 
                type="text" 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleInputChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="postalCode">Posta Kodu</Label>
              <Input 
                type="text" 
                id="postalCode" 
                name="postalCode" 
                value={formData.postalCode} 
                onChange={handleInputChange} 
                required 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="country">Ülke</Label>
              <Select 
                id="country" 
                name="country" 
                value={formData.country} 
                onChange={handleInputChange} 
                required
              >
                <option value="Türkiye">Türkiye</option>
                <option value="Almanya">Almanya</option>
                <option value="İngiltere">İngiltere</option>
                <option value="Fransa">Fransa</option>
              </Select>
            </InputGroup>
          </FormSection>
          
          <FormSection>
            <SectionTitle>
              <FaCreditCard /> Ödeme Yöntemi
            </SectionTitle>
            <PaymentOptions>
              <PaymentOption 
                selected={paymentMethod === 'creditCard'}
                onClick={() => setPaymentMethod('creditCard')}
              >
                <PaymentIcon>
                  <FaCreditCard />
                </PaymentIcon>
                <div>Kredi Kartı</div>
              </PaymentOption>
              
              <PaymentOption 
                selected={paymentMethod === 'cash'}
                onClick={() => setPaymentMethod('cash')}
              >
                <PaymentIcon>
                  <FaMoneyBill />
                </PaymentIcon>
                <div>Kapıda Ödeme</div>
              </PaymentOption>
            </PaymentOptions>
          </FormSection>
          
          <SubmitButton type="submit">
            <FaShoppingBag /> Siparişi Tamamla
          </SubmitButton>
        </CheckoutForm>
        
        <OrderSummary>
          <SummaryTitle>Sipariş Özeti</SummaryTitle>
          
          <SummaryItems>
            {cart.map((item) => (
              <SummaryItem key={item.id}>
                <SummaryItemName>{item.name}</SummaryItemName>
                <SummaryItemQuantity>x{item.quantity}</SummaryItemQuantity>
                <SummaryItemPrice>{(item.price * item.quantity).toFixed(2)} TL</SummaryItemPrice>
              </SummaryItem>
            ))}
          </SummaryItems>
          
          <SummaryTotal>
            <TotalRow>
              <span>Ara Toplam:</span>
              <span>{subtotal.toFixed(2)} TL</span>
            </TotalRow>
            <TotalRow>
              <span>Kargo:</span>
              <span>
                {shipping === 0 ? 'Ücretsiz' : `${shipping.toFixed(2)} TL`}
              </span>
            </TotalRow>
            <TotalRow>
              <span>Toplam:</span>
              <span>{total.toFixed(2)} TL</span>
            </TotalRow>
          </SummaryTotal>
        </OrderSummary>
      </CheckoutGrid>
      
      <BackLink to="/cart">
        <FaArrowLeft /> Sepete Geri Dön
      </BackLink>
    </CheckoutContainer>
  )
}

export default CheckoutPage