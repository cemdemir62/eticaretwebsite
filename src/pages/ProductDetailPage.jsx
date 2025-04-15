import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaCheck, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa'

function ProductDetailPage({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeTab, setActiveTab] = useState('description')
  
  // Fetch product data based on ID
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0].name)
      }
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0])
      }
    }
  }, [id])
  
  if (!product) {
    return <div>Loading...</div>
  }
  
  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize
    })
  }
  
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }
  
  return (
    <ProductContainer>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to="/">Ana Sayfa</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/products">Ürünler</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{product.name}</BreadcrumbItem>
      </Breadcrumbs>
      
      <ProductLayout>
        <ProductGallery>
          <MainImage>
            <img src={product.images ? product.images[selectedImage] : product.image} alt={product.name} />
          </MainImage>
          
          {product.images && (
            <ThumbnailsContainer>
              {product.images.map((image, index) => (
                <Thumbnail 
                  key={index} 
                  active={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} - ${index + 1}`} />
                </Thumbnail>
              ))}
            </ThumbnailsContainer>
          )}
        </ProductGallery>
        
        <ProductInfo>
          <ProductBadges>
            {product.isNew && <span className="badge badge-new">Yeni</span>}
            {product.isSale && <span className="badge badge-sale">İndirim</span>}
          </ProductBadges>
          
          <ProductTitle>{product.name}</ProductTitle>
          
          <ProductMeta>
            <ProductRating>
              <Stars>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.floor(product.rating) ? '#ffc107' : '#e4e5e9'} />
                ))}
              </Stars>
              <ReviewCount>{product.reviewCount} değerlendirme</ReviewCount>
            </ProductRating>
            
            <ProductCode>Ürün Kodu: {product.id}</ProductCode>
          </ProductMeta>
          
          <ProductPrices>
            <CurrentPrice>
              {product.price.toLocaleString('tr-TR')} TL
              {product.oldPrice && (
                <Discount>
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% İndirim
                </Discount>
              )}
            </CurrentPrice>
            
            {product.oldPrice && (
              <OldPrice>{product.oldPrice.toLocaleString('tr-TR')} TL</OldPrice>
            )}
            
            <TaxInfo>KDV Dahil</TaxInfo>
          </ProductPrices>
          
          {/* Rest of the component implementation */}
        </ProductInfo>
      </ProductLayout>
      
      {/* Additional sections like tabs, reviews, etc. */}
    </ProductContainer>
  )
}

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const Breadcrumbs = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 14px;
  color: #777;
`

const BreadcrumbItem = styled.span`
  &:not(:last-child)::after {
    content: '/';
    margin: 0 8px;
  }
  
  a {
    color: #777;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff4500;
    }
  }
  
  &:last-child {
    color: #333;
    font-weight: 500;
  }
`

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProductGallery = styled.div`
  display: flex;
  flex-direction: column;
`

const MainImage = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 1 / 1;
  }
`

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
  
  &::-webkit-scrollbar {
    height: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ active }) => (active ? '#ff4500' : 'transparent')};
  transition: border-color 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    border-color: ${({ active }) => (active ? '#ff4500' : '#ddd')};
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductBadges = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`

const ProductTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`

const ProductRating = styled.div`
  display: flex;
  align-items: center;
`

const Stars = styled.div`
  display: flex;
  color: #ffc107;
  margin-right: 5px;
`

const ReviewCount = styled.span`
  font-size: 14px;
  color: #777;
`

const ProductCode = styled.div`
  font-size: 14px;
  color: #777;
`

const ProductPrices = styled.div`
  margin-bottom: 20px;
`

const CurrentPrice = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: #ff4500;
  margin-bottom: 5px;
`

const OldPrice = styled.div`
  font-size: 1.1rem;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 5px;
`

const Discount = styled.span`
  background-color: #ff4500;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  margin-left: 10px;
`

const TaxInfo = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 20px;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 20px 0;
`

const ProductVariants = styled.div`
  margin-bottom: 20px;
`

const VariantTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
`

const ColorOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  border: 2px solid ${({ selected }) => (selected ? '#ff4500' : 'transparent')};
  transition: border-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`

const SizeOption = styled.div`
  padding: 8px 15px;
  border: 1px solid ${({ selected }) => (selected ? '#ff4500' : '#ddd')};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#fff5f0' : 'white')};
  color: ${({ selected }) => (selected ? '#ff4500' : '#333')};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff4500;
  }
  
  &.out-of-stock {
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: line-through;
  }
`

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 16px;
  padding: 0 10px;
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const AddToCartButton = styled.button`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: #e03e00;
  }
`

const WishlistButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 8px;
    color: #ff4500;
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
`

const ProductFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  
  svg {
    color: #4caf50;
    margin-right: 8px;
    flex-shrink: 0;
  }
`

const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
  
  svg {
    font-size: 24px;
    color: #ff4500;
  }
`

const DeliveryText = styled.div`
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #333;
  }
  
  p {
    font-size: 14px;
    color: #777;
  }
`

const ShareButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`

const ShareButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff4500;
    color: white;
  }
`

const TabsContainer = styled.div`
  margin-bottom: 40px;
`

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
  }
`

const TabButton = styled.button`
  padding: 12px 20px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#ff4500' : '#555')};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #ff4500;
    transform: scaleX(${({ active }) => (active ? '1' : '0')});
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #ff4500;
    
    &::after {
      transform: scaleX(1);
    }
  }
`

const TabContent = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
`

const ProductDescription = styled.div`
  line-height: 1.6;
  color: #555;
  
  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
    color: #333;
  }
  
  p {
    margin-bottom: 15px;
  }
  
  ul {
    list-style-type: disc;
    margin-left: 20px;
    margin-bottom: 15px;
  }
  
  li {
    margin-bottom: 8px;
  }
`

const SpecificationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-weight: 500;
    color: #333;
    width: 30%;
  }
  
  td {
    color: #555;
  }
`

const ReviewsContainer = styled.div`
  margin-bottom: 30px;
`

const ReviewsSummary = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const AverageRating = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`

const RatingNumber = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: #333;
  line-height: 1;
  margin-bottom: 10px;
`

const RatingStars = styled.div`
  display: flex;
  color: #ffc107;
  font-size: 24px;
  margin-bottom: 10px;
`

const TotalReviews = styled.div`
  font-size: 14px;
  color: #777;
`

const RatingBreakdown = styled.div`
  flex: 2;
`

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`

const RatingLevel = styled.div`
  width: 60px;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
    color: #ffc107;
  }
`

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  margin: 0 15px;
  overflow: hidden;
`

const ProgressBar = styled.div`
  height: 100%;
  background-color: #ffc107;
  width: ${({ percentage }) => percentage}%;
`

const RatingCount = styled.div`
  font-size: 14px;
  color: #777;
  width: 50px;
  text-align: right;
`

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ReviewCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
`

const ReviewAvatar = styled.div`
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

const ReviewAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewAuthorName = styled.div`
  font-weight: 500;
  color: #333;
`

const ReviewDate = styled.div`
  font-size: 12px;
  color: #999;
`

const ReviewRating = styled.div`
  display: flex;
  color: #ffc107;
`

const ReviewContent = styled.div`
  color: #555;
  line-height: 1.6;
`

const ReviewTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
`

const ReviewText = styled.p`
  margin-bottom: 15px;
`

const ReviewImages = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  overflow-x: auto;
  padding-bottom: 5px;
  
  &::-webkit-scrollbar {
    height: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`

const ReviewImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`

const ReviewActions = styled.div`
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #777;
`

const ReviewAction = styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff4500;
  }
  
  svg {
    margin-right: 5px;
  }
`

const LoadMoreButton = styled.button`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px auto 0;
  display: block;
  
  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }
`

const WriteReviewButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    background-color: #e03e00;
  }
`

const RelatedProductsSection = styled.section`
  margin-bottom: 40px;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background-color: #ff4500;
    margin-top: 10px;
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
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

// Örnek ürün verileri
const products = [
  {
    id: 1,
    name: 'Akıllı Telefon X',
    price: 7999.99,
    oldPrice: 8999.99,
    image: 'https://via.placeholder.com/300x300',
    images: [
      'https://via.placeholder.com/600x600',
      'https://via.placeholder.com/600x600/eee',
      'https://via.placeholder.com/600x600/ddd',
      'https://via.placeholder.com/600x600/ccc',
    ],
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isSale: true,
    category: 'Elektronik',
    brand: 'TechX',
    description: 'Son teknoloji özelliklere sahip akıllı telefon. Yüksek performans, uzun pil ömrü ve profesyonel kamera sistemi ile hayatınızı kolaylaştırır.',
    specifications: [
      { name: 'Ekran', value: '6.5 inç AMOLED' },
      { name: 'İşlemci', value: 'Octa-core 2.8 GHz' },
      { name: 'RAM', value: '8 GB' },
      { name: 'Depolama', value: '128 GB' },
      { name: 'Kamera', value: '48 MP + 12 MP + 8 MP' },
      { name: 'Ön Kamera', value: '32 MP' },
      { name: 'Batarya', value: '4500 mAh' },
      { name: 'İşletim Sistemi', value: 'Android 12' },
    ],
    colors: [
      { name: 'Siyah', code: '#000000' },
      { name: 'Beyaz', code: '#ffffff' },
      { name: 'Mavi', code: '#0066cc' },
    ],
    sizes: [],
    stock: 15,
    reviews: [
      {
        id: 1,
        author: 'Ahmet Y.',
        avatar: 'https://via.placeholder.com/40x40',
        date: '15.08.2023',
        rating: 5,
        title: 'Mükemmel bir telefon',
        text: 'Uzun araştırmalar sonucunda bu telefonu aldım ve kesinlikle doğru bir karar vermişim. Kamera kalitesi, pil ömrü ve performansı beklentilerimin üzerinde. Özellikle gece çekimleri inanılmaz başarılı.',
        images: ['https://via.placeholder.com/80x80', 'https://via.placeholder.com/80x80'],
        likes: 12,
      },
      {
        id: 2,
        author: 'Mehmet S.',
        avatar: 'https://via.placeholder.com/40x40',
        date: '02.08.2023',
        rating: 4,
        title: 'Fiyatına göre iyi',
        text: 'Genel olarak memnunum fakat pil ömrü biraz daha iyi olabilirdi. Yoğun kullanımda günü çıkarmakta zorlanıyor. Kamera kalitesi ve performans olarak ise rakiplerinden bir adım önde.',
        images: [],
        likes: 5,
      },
      {
        id: 3,
        author: 'Ayşe K.',
        avatar: 'https://via.placeholder.com/40x40',
        date: '25.07.2023',
        rating: 5,
        title: 'Tam bir fotoğraf canavarı',
        text: 'Telefonu özellikle fotoğraf çekmek için tercih ettim ve beni hiç yanıltmadı. Pro mod ile harika fotoğraflar çekebiliyorsunuz. Ayrıca ekran kalitesi film izlemek için mükemmel.',
        images: ['https://via.placeholder.com/80x80'],
        likes: 8,
      },
    ],
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
    isSale: false,
    category: 'Elektronik',
    brand: 'AudioMax'
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
    isSale: true,
    category: 'Elektronik',
    brand: 'TechX'
  },
  {
    id: 4,
    name: 'Dizüstü Bilgisayar Pro',
    price: 12
  },
  {
    id: 4,
    name: 'Dizüstü Bilgisayar Pro',
    price: 12999.99,
    oldPrice: 14999.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.6,
    reviewCount: 42,
    isNew: false,
    isSale: true,
    category: 'Elektronik',
    brand: 'TechX'
  }
]

export default ProductDetailPage
