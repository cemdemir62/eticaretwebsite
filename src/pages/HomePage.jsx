import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaStar, FaArrowRight, FaShoppingCart } from 'react-icons/fa'

// Bileşenler
import ProductCard from '../components/ProductCard'

const HeroSection = styled.section`
  background: linear-gradient(135deg, #ff4500, #ff8c00);
  color: white;
  padding: 60px 0;
  margin-bottom: 40px;
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const HeroText = styled.div`
  flex: 1;
  padding-right: 40px;
  
  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 30px;
  }
`

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
`

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #ff4500;
    margin: 15px auto 0;
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4500;
  font-weight: 500;
  margin-bottom: 40px;
  
  svg {
    margin-left: 5px;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`

const CategorySection = styled.section`
  padding: 40px 0;
  background-color: #f5f5f5;
  margin-bottom: 40px;
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const CategoryCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const CategoryImage = styled.div`
  height: 150px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${CategoryCard}:hover & img {
    transform: scale(1.05);
  }
`

const CategoryName = styled.h3`
  padding: 15px;
  text-align: center;
  font-weight: 500;
  color: #333;
`

const BannerSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 20px;
`

const Banner = styled.div`
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 8px;
  padding: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const BannerContent = styled.div`
  flex: 2;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`

const BannerTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 15px;
`

const BannerText = styled.p`
  margin-bottom: 20px;
  opacity: 0.9;
`

const BannerButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #3498db;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
`

const BannerImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const TestimonialsSection = styled.section`
  padding: 40px 0;
  background-color: #f9f9f9;
  margin-bottom: 40px;
`

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 15px;
  color: #555;
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`

const TestimonialAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 10px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const TestimonialInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const TestimonialName = styled.span`
  font-weight: 500;
  color: #333;
`

const TestimonialRating = styled.div`
  color: #ffc107;
  display: flex;
  margin-top: 5px;
`

// Örnek veri
const featuredProducts = [
  {
    id: 1,
    name: 'Akıllı Telefon X',
    price: 7999.99,
    oldPrice: 8999.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isSale: true
  },
  {
    id: 2,
    name: 'Kablosuz Kulaklık Pro',
    price: 1299.99,
    oldPrice: null,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.8,
    reviewCount: 95,
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: 'Akıllı Saat Ultra',
    price: 2499.99,
    oldPrice: 2999.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.2,
    reviewCount: 67,
    isNew: false,
    isSale: true
  },
  {
    id: 4,
    name: 'Dizüstü Bilgisayar Pro',
    price: 12999.99,
    oldPrice: null,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.7,
    reviewCount: 42,
    isNew: false,
    isSale: false
  }
]

const bestSellingProducts = [
  {
    id: 5,
    name: 'Bluetooth Hoparlör',
    price: 899.99,
    oldPrice: 1199.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.6,
    reviewCount: 112,
    isNew: false,
    isSale: true
  },
  {
    id: 6,
    name: 'Akıllı Ev Asistanı',
    price: 1499.99,
    oldPrice: null,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.3,
    reviewCount: 78,
    isNew: true,
    isSale: false
  },
  {
    id: 7,
    name: 'Oyun Konsolu',
    price: 5999.99,
    oldPrice: 6499.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    isSale: true
  },
  {
    id: 8,
    name: 'Kablosuz Şarj Standı',
    price: 349.99,
    oldPrice: null,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.4,
    reviewCount: 56,
    isNew: false,
    isSale: false
  }
]

const categories = [
  { id: 1, name: 'Elektronik', image: 'https://via.placeholder.com/300x150' },
  { id: 2, name: 'Giyim', image: 'https://via.placeholder.com/300x150' },
  { id: 3, name: 'Ev & Yaşam', image: 'https://via.placeholder.com/300x150' },
  { id: 4, name: 'Spor & Outdoor', image: 'https://via.placeholder.com/300x150' }
]

const testimonials = [
  {
    id: 1,
    text: 'Siparişim çok hızlı geldi ve ürün beklediğimden daha kaliteli çıktı. Kesinlikle tekrar alışveriş yapacağım!',
    name: 'Ahmet Y.',
    avatar: 'https://via.placeholder.com/40x40',
    rating: 5
  },
  {
    id: 2,
    text: 'Müşteri hizmetleri çok ilgili ve yardımsever. Yaşadığım küçük sorunu hemen çözdüler.',
    name: 'Ayşe K.',
    avatar: 'https://via.placeholder.com/40x40',
    rating: 4
  },
  {
    id: 3,
    text: 'Ürün kalitesi ve fiyat performans açısından çok memnun kaldım. Arkadaşlarıma da tavsiye edeceğim.',
    name: 'Mehmet S.',
    avatar: 'https://via.placeholder.com/40x40',
    rating: 5
  }
]

function HomePage({ addToCart }) {
  return (
    <div>
      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle>Alışverişin En Keyifli Hali</HeroTitle>
            <HeroSubtitle>
              Binlerce ürün, uygun fiyatlar ve hızlı teslimat ile online alışverişin tadını çıkarın.
            </HeroSubtitle>
            <Link to="/products" className="btn btn-primary">
              Hemen Alışverişe Başla
            </Link>
          </HeroText>
          <HeroImage>
            <img src="https://via.placeholder.com/600x400" alt="E-Ticaret" />
          </HeroImage>
        </HeroContent>
      </HeroSection>
      
      <section className="container">
        <SectionTitle>Öne Çıkan Ürünler</SectionTitle>
        <ProductsGrid>
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))}
        </ProductsGrid>
        <ViewAllLink to="/products">
          Tüm Ürünleri Gör <FaArrowRight />
        </ViewAllLink>
      </section>
      
      <CategorySection>
        <SectionTitle>Kategoriler</SectionTitle>
        <CategoriesGrid>
          {categories.map(category => (
            <CategoryCard key={category.id} to={`/products?category=${category.id}`}>
              <CategoryImage>
                <img src={category.image} alt={category.name} />
              </CategoryImage>
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategorySection>
      
      <BannerSection>
        <Banner>
          <BannerContent>
            <BannerTitle>Özel İndirim Fırsatı</BannerTitle>
            <BannerText>
              Seçili ürünlerde %50'ye varan indirimler sizi bekliyor. Bu fırsatı kaçırmayın!
            </BannerText>
            <BannerButton to="/products?category=kampanyalar">
              Kampanyaları Keşfet
            </BannerButton>
          </BannerContent>
          <BannerImage>
            <img src="https://via.placeholder.com/300x200" alt="Kampanya" />
          </BannerImage>
        </Banner>
      </BannerSection>
      
      <section className="container">
        <SectionTitle>Çok Satanlar</SectionTitle>
        <ProductsGrid>
          {bestSellingProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))}
        </ProductsGrid>
        <ViewAllLink to="/products?sort=bestselling">
          Tüm Çok Satanları Gör <FaArrowRight />
        </ViewAllLink>
      </section>
      
      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle>Müşteri Yorumları</SectionTitle>
          <TestimonialsGrid>
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id}>
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <TestimonialAvatar>
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </TestimonialAvatar>
                  <TestimonialInfo>
                    <TestimonialName>{testimonial.name}</TestimonialName>
                    <TestimonialRating>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < testimonial.rating ? '#ffc107' : '#e4e5e9'} />
                      ))}
                    </TestimonialRating>
                  </TestimonialInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>
    </div>
  )
}

export default HomePage