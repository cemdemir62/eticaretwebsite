import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaHistory, FaSignOutAlt, FaShoppingBag, FaCog } from 'react-icons/fa'

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`

const ProfileTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
`

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProfileSidebar = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #777;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ProfileName = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`

const ProfileMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ProfileMenuItem = styled.li`
  margin-bottom: 5px;
`

const MenuLink = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
  text-align: left;
  background-color: ${({ active }) => (active ? '#ff4500' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#555')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ active }) => (active ? '#ff4500' : '#f0f0f0')};
  }
`

const ProfileContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const ContentSection = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
`

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
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

const SaveButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a80d2;
  }
`

const OrderList = styled.div`
  margin-top: 20px;
`

const OrderItem = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
`

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 5px;
  }
`

const OrderNumber = styled.div`
  font-weight: 500;
`

const OrderDate = styled.div`
  color: #777;
`

const OrderStatus = styled.div`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return '#e6f7e6';
      case 'processing':
        return '#fff8e6';
      case 'cancelled':
        return '#ffe6e6';
      default:
        return '#f0f0f0';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return '#2e7d32';
      case 'processing':
        return '#ed6c02';
      case 'cancelled':
        return '#d32f2f';
      default:
        return '#777';
    }
  }};
`

const OrderProducts = styled.div`
  margin-bottom: 10px;
`

const OrderTotal = styled.div`
  font-weight: 500;
  text-align: right;
`

const OrderDetails = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  color: #4a90e2;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const SettingGroup = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`

const SettingTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #333;
`

const SettingDescription = styled.p`
  color: #777;
  margin-bottom: 15px;
  font-size: 0.9rem;
`

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
  }
  
  span:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + span {
    background-color: #4a90e2;
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`

function ProfilePage() {
  const [activeSection, setActiveSection] = useState('personal')
  const [userData, setUserData] = useState({
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 4567',
    address: 'Atatürk Mah. Cumhuriyet Cad. No:123 İstanbul/Türkiye'
  })
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }
  
  const handleSettingChange = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    })
  }
  
  const orders = [
    {
      id: 'ORD-2023-001',
      date: '15.10.2023',
      status: 'completed',
      products: 'iPhone 13 Pro, AirPods Pro',
      total: '24.999,00 ₺'
    },
    {
      id: 'ORD-2023-002',
      date: '02.11.2023',
      status: 'processing',
      products: 'MacBook Air M2',
      total: '32.999,00 ₺'
    },
    {
      id: 'ORD-2023-003',
      date: '10.11.2023',
      status: 'cancelled',
      products: 'iPad Mini',
      total: '14.999,00 ₺'
    }
  ]
  
  return (
    <ProfileContainer>
      <ProfileTitle>
        <FaUser /> Hesabım
      </ProfileTitle>
      
      <ProfileGrid>
        <ProfileSidebar>
          <ProfileAvatar>
            <FaUser />
          </ProfileAvatar>
          <ProfileName>{userData.fullName}</ProfileName>
          
          <ProfileMenu>
            <ProfileMenuItem>
              <MenuLink 
                active={activeSection === 'personal'} 
                onClick={() => setActiveSection('personal')}
              >
                <FaUser /> Kişisel Bilgiler
              </MenuLink>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <MenuLink 
                active={activeSection === 'orders'} 
                onClick={() => setActiveSection('orders')}
              >
                <FaShoppingBag /> Siparişlerim
              </MenuLink>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <MenuLink 
                active={activeSection === 'settings'} 
                onClick={() => setActiveSection('settings')}
              >
                <FaCog /> Ayarlar
              </MenuLink>
            </ProfileMenuItem>
            <ProfileMenuItem>
              <MenuLink as={Link} to="/login">
                <FaSignOutAlt /> Çıkış Yap
              </MenuLink>
            </ProfileMenuItem>
          </ProfileMenu>
        </ProfileSidebar>
        
        <ProfileContent>
          <ContentSection active={activeSection === 'personal'}>
            <SectionTitle>
              <FaEdit /> Kişisel Bilgiler
            </SectionTitle>
            
            <form>
              <FormGroup>
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  value={userData.fullName}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phone">Telefon Numarası</Label>
                <Input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="address">Adres</Label>
                <Input 
                  as="textarea" 
                  id="address" 
                  name="address" 
                  value={userData.address}
                  onChange={handleInputChange}
                  style={{ height: '100px' }}
                />
              </FormGroup>
              
              <SaveButton type="button">Değişiklikleri Kaydet</SaveButton>
            </form>
          </ContentSection>
          
          <ContentSection active={activeSection === 'orders'}>
            <SectionTitle>
              <FaHistory /> Sipariş Geçmişi
            </SectionTitle>
            
            <OrderList>
              {orders.map(order => (
                <OrderItem key={order.id}>
                  <OrderHeader>
                    <OrderNumber>Sipariş No: {order.id}</OrderNumber>
                    <OrderDate>Tarih: {order.date}</OrderDate>
                    <OrderStatus status={order.status}>
                      {order.status === 'completed' && 'Tamamlandı'}
                      {order.status === 'processing' && 'İşleniyor'}
                      {order.status === 'cancelled' && 'İptal Edildi'}
                    </OrderStatus>
                  </OrderHeader>
                  
                  <OrderProducts>
                    <strong>Ürünler:</strong> {order.products}
                  </OrderProducts>
                  
                  <OrderTotal>Toplam: {order.total}</OrderTotal>
                  
                  <OrderDetails to={`/orders/${order.id}`}>
                    Sipariş Detaylarını Görüntüle
                  </OrderDetails>
                </OrderItem>
              ))}
            </OrderList>
          </ContentSection>
          
          <ContentSection active={activeSection === 'settings'}>
            <SectionTitle>
              <FaCog /> Hesap Ayarları
            </SectionTitle>
            
            <SettingGroup>
              <SettingTitle>Bildirim Tercihleri</SettingTitle>
              <SettingDescription>
                Hangi kanallardan bildirim almak istediğinizi seçin.
              </SettingDescription>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>E-posta Bildirimleri</span>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications}
                    onChange={() => handleSettingChange('emailNotifications')}
                  />
                  <span></span>
                </ToggleSwitch>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>SMS Bildirimleri</span>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.smsNotifications}
                    onChange={() => handleSettingChange('smsNotifications')}
                  />
                  <span></span>
                </ToggleSwitch>
              </div>
            </SettingGroup>
            
            <SettingGroup>
              <SettingTitle>Güvenlik</SettingTitle>
              <SettingDescription>
                Hesabınızın güvenliğini artırmak için ek önlemler alın.
              </SettingDescription>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>İki Faktörlü Doğrulama</span>
                <ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={settings.twoFactorAuth}
                    onChange={() => handleSettingChange('twoFactorAuth')}
                  />
                  <span></span>
                </ToggleSwitch>
              </div>
            </SettingGroup>
            
            <SaveButton type="button">Ayarları Kaydet</SaveButton>
          </ContentSection>
        </ProfileContent>
      </ProfileGrid>
    </ProfileContainer>
  )
}

export default ProfilePage