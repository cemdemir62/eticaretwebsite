import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { FaFilter, FaSort, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'

// Bileşenler
import ProductCard from '../components/ProductCard'

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ProductsTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
`

const ProductsCount = styled.span`
  color: #777;
  font-size: 14px;
  margin-left: 10px;
`

const ProductsActions = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`

const ProductsLayout = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`

const FilterSidebar = styled.div`
  width: 250px;
  flex-shrink: 0;
  
  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 20px;
    display: ${({ isFilterVisible }) => (isFilterVisible ? 'block' : 'none')};
  }
`

const FilterSection = styled.div`
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`

const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`

const FilterContent = styled.div`
  padding: 15px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const FilterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FilterItem = styled.li`
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const FilterCheckbox = styled.div`
  display: flex;
  align-items: center;
`

const CheckboxInput = styled.input`
  margin-right: 10px;
`

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #555;
  cursor: pointer;
  
  &:hover {
    color: #ff4500;
  }
`

const FilterCount = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 5px;
`

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const PriceInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

const ApplyButton = styled.button`
  background-color: #ff4500;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  width: 100%;
  
  &:hover {
    background-color: #e03e00;
  }
`

const ProductsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`

const MobileFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px 8px 0 0;
  
  @media (min-width: 993px) {
    display: none;
  }
`

const CloseFilterButton = styled.button`
  background: none;
  border: none;
  color: #777;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SortDropdown = styled.div`
  position: relative;
`

const SortButton = styled(ActionButton)`
  min-width: 150px;
  justify-content: space-between;
`

const SortOptions = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 5px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const SortOption = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &.active {
    background-color: #f0f0f0;
    font-weight: 500;
  }
`

const NoProductsFound = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #777;
  width: 100%;
`

// Örnek ürün verileri
const allProducts = [
  {
    id: 1,
    name: 'Akıllı Telefon X',
    price: 7999.99,
    oldPrice: 8999.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isSale: true,
    category: 'Elektronik',
    brand: 'TechX'
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
    price: 12999.99,
    oldPrice: null,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.7,
    reviewCount: 42,
    isNew: false,
    isSale: false,
    category: 'Elektronik',
    brand: 'CompTech'
  },
  {
    id: 5,
    name: 'Bluetooth Hoparlör',
    price: 899.99,
    oldPrice: 1199.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.6,
    reviewCount: 112,
    isNew: false,
    isSale: true,
    category: 'Elektronik',
    brand: 'AudioMax'
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
    isSale: false,
    category: 'Elektronik',
    brand: 'SmartHome'
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
    isSale: true,
    category: 'Elektronik',
    brand: 'GameTech'
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
    isSale: false,
    category: 'Elektronik',
    brand: 'TechX'
  },
  {
    id: 9,
    name: 'Akıllı Robot Süpürge',
    price: 3499.99,
    oldPrice: 3999.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.7,
    reviewCount: 89,
    isNew: true,
    isSale: true,
    category: 'Ev & Yaşam',
    brand: 'SmartHome'
  },
  {
    id: 10,
    name: 'Kahve Makinesi',
    price: 1799.99,
    oldPrice: null,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.5,
    reviewCount: 72,
    isNew: false,
    isSale: false,
    category: 'Ev & Yaşam',
    brand: 'HomePlus'
  },
  {
    id: 11,
    name: 'Spor Ayakkabı',
    price: 899.99,
    oldPrice: 1299.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.6,
    reviewCount: 145,
    isNew: false,
    isSale: true,
    category: 'Spor & Outdoor',
    brand: 'SportMax'
  },
  {
    id: 12,
    name: 'Koşu Bandı',
    price: 4999.99,
    oldPrice: 5499.99,
    image: 'https://via.placeholder.com/300x300',
    rating: 4.3,
    reviewCount: 38,
    isNew: true,
    isSale: true,
    category: 'Spor & Outdoor',
    brand: 'FitLife'
  }
]

function ProductsPage({ addToCart }) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  
  // Filtre ve sıralama durumları
  const [isFilterVisible, setIsFilterVisible] = useState(window.innerWidth > 992)
  const [openFilterSections, setOpenFilterSections] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true,
    discount: true
  })
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  
  // Filtre durumları
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [selectedRatings, setSelectedRatings] = useState([])
  const [showDiscount, setShowDiscount] = useState(false)
  
  // Sıralama durumu
  const [sortOption, setSortOption] = useState('featured')
  
  // Filtrelenmiş ürünler
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  
  // URL'den filtre parametrelerini al
  useEffect(() => {
    const category = queryParams.get('category')
    const search = queryParams.get('search')
    const sort = queryParams.get('sort')
    
    // Kategori filtresini uygula
    if (category) {
      setSelectedCategories([category])
    }
    
    // Sıralama seçeneğini uygula
    if (sort) {
      setSortOption(sort)
    }
    
    // Arama filtresini uygula (basit bir arama implementasyonu)
    if (search) {
      const searchLower = search.toLowerCase()
      setFilteredProducts(
        allProducts.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower)
        )
      )
    }
  }, [location.search])
  
  // Filtre değişikliklerini izle ve ürünleri filtrele
  useEffect(() => {
    let result = [...allProducts]
    
    // Kategori filtresi
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category))
    }
    
    // Marka filtresi
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand))
    }
    
    // Fiyat aralığı filtresi
    if (priceRange.min !== '' || priceRange.max !== '') {
      result = result.filter(product => {
        const min = priceRange.min === '' ? 0 : parseFloat(priceRange.min)
        const max = priceRange.max === '' ? Infinity : parseFloat(priceRange.max)
        return product.price >= min && product.price <= max
      })
    }
    
    // Puan filtresi
    if (selectedRatings.length > 0) {
      result = result.filter(product => {
        const productRating = Math.floor(product.rating)
        return selectedRatings.includes(productRating.toString())
      })
    }
    
    // İndirim filtresi
    if (showDiscount) {
      result = result.filter(product => product.oldPrice !== null)
    }
    
    // Sıralama
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      case 'bestselling':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default: // featured
        // Varsayılan sıralama, değişiklik yok
        break
    }
    
    setFilteredProducts(result)
  }, [selectedCategories, selectedBrands, priceRange, selectedRatings, showDiscount, sortOption])
  
  // Filtre bölümünü aç/kapat
  const toggleFilterSection = (section) => {
    setOpenFilterSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  // Kategori seçimi değişikliği
  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }
  
  // Marka seçimi değişikliği
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand)
      } else {
        return [...prev, brand]
      }
    })
  }
  
  // Puan seçimi değişikliği
  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating)
      } else {
        return [...prev, rating]
      }
    })
  }
  
  // Fiyat aralığı değişikliği
  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Sıralama seçeneği değişikliği
  const handleSortChange = (option) => {
    setSortOption(option)
    setIsSortDropdownOpen(false)
  }
  
  // Sıralama seçeneği metni
  const getSortOptionText = () => {
    switch (sortOption) {
      case 'price-low':
        return 'Fiyat (Düşükten Yükseğe)'
      case 'price-high':
        return 'Fiyat (Yüksekten Düşüğe)'
      case 'newest':
        return 'En Yeniler'
      case 'bestselling':
        return 'Çok Satanlar'
      case 'rating':
        return 'En Yüksek Puan'
      default:
        return 'Öne Çıkanlar'
    }
  }
  
  // Benzersiz kategorileri al
  const categories = [...new Set(allProducts.map(product => product.category))]
  
  // Benzersiz markaları al
  const brands = [...new Set(allProducts.map(product => product.brand))]
  
  return (
    <ProductsContainer>
      <ProductsHeader>
        <div>
          <ProductsTitle>Ürünler</ProductsTitle>
          <ProductsCount>{filteredProducts.length} ürün bulundu</ProductsCount>
        </div>
        
        <ProductsActions>
          <ActionButton onClick={() => setIsFilterVisible(!isFilterVisible)}>
            <FaFilter /> Filtrele
          </ActionButton>
          
          <SortDropdown>
            <SortButton onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}>
              <FaSort /> {getSortOptionText()}
              {isSortDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </SortButton>
            
            <SortOptions isOpen={isSortDropdownOpen}>
              <SortOption 
                className={sortOption === 'featured' ? 'active' : ''}
                onClick={() => handleSortChange('featured')}
              >
                Öne Çıkanlar
              </SortOption>
              <SortOption 
                className={sortOption === 'price-low' ? 'active' : ''}
                onClick={() => handleSortChange('price-low')}
              >
                Fiyat (Düşükten Yükseğe)
              </SortOption>
              <SortOption 
                className={sortOption === 'price-high' ? 'active' : ''}
                onClick={() => handleSortChange('price-high')}
              >
                Fiyat (Yüksekten Düşüğe)
              </SortOption>
              <SortOption 
                className={sortOption === 'newest' ? 'active' : ''}
                onClick={() => handleSortChange('newest')}
              >
                En Yeniler
              </SortOption>
              <SortOption 
                className={sortOption === 'bestselling' ? 'active' : ''}
                onClick={() => handleSortChange('bestselling')}
              >
                Çok Satanlar
              </SortOption>
              <SortOption 
                className={sortOption === 'rating' ? 'active' : ''}
                onClick={() => handleSortChange('rating')}
              >
                En Yüksek Puan
              </SortOption>
            </SortOptions>
          </SortDropdown>
        </ProductsActions>
      </ProductsHeader>
      
      <ProductsLayout>
        <FilterSidebar isFilterVisible={isFilterVisible}>
          <MobileFilterHeader>
            <h3>Filtreler</h3>
            <CloseFilterButton onClick={() => setIsFilterVisible(false)}>
              <FaTimes />
            </CloseFilterButton>
          </MobileFilterHeader>
          
          <FilterSection>
            <FilterHeader onClick={() => toggleFilterSection('categories')}>
              <FilterTitle>Kategoriler</FilterTitle>
              {openFilterSections.categories ? <FaChevronUp /> : <FaChevronDown />}
            </FilterHeader>
            
            <FilterContent isOpen={openFilterSections.categories}>
              <FilterList>
                {categories.map(category => (
                  <FilterItem key={category}>
                    <FilterCheckbox>
                      <CheckboxInput 
                        type="checkbox" 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <CheckboxLabel htmlFor={`category-${category}`}>
                        {category}
                        <FilterCount>
                          ({allProducts.filter(p => p.category === category).length})
                        </FilterCount>
                      </CheckboxLabel>
                    </FilterCheckbox>
                  </FilterItem>
                ))}
              </FilterList>
            </FilterContent>
          </FilterSection>
          
          <FilterSection>
            <FilterHeader onClick={() => toggleFilterSection('brands')}>
              <FilterTitle>Markalar</FilterTitle>
              {openFilterSections.brands ? <FaChevronUp /> : <FaChevronDown />}
            </FilterHeader>
            
            <FilterContent isOpen={openFilterSections.brands}>
              <FilterList>
                {brands.map(brand => (
                  <FilterItem key={brand}>
                    <FilterCheckbox>
                      <CheckboxInput 
                        type="checkbox" 
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                      />
                      <CheckboxLabel htmlFor={`brand-${brand}`}>
                        {brand}
                        <FilterCount>
                          ({allProducts.filter(p => p.brand === brand).length})
                        </FilterCount>
                      </CheckboxLabel>
                    </FilterCheckbox>
                  </FilterItem>
                ))}
              </FilterList>
            </FilterContent>
          </FilterSection>
          
          <FilterSection>
            <FilterHeader onClick={() => toggleFilterSection('price')}>
              <FilterTitle>Fiyat Aralığı</FilterTitle>
              {openFilterSections.price ? <FaChevronUp /> : <FaChevronDown />}
            </FilterHeader>
            
            <FilterContent isOpen={openFilterSections.price}>
              <PriceRange>
                <PriceInput 
                  type="number" 
                  placeholder="Min" 
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                />
                <span>-</span>
                <PriceInput 
                  type="number" 
                  placeholder="Max" 
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                />
              </PriceRange>
            </FilterContent>
          </FilterSection>
          
          <FilterSection>
            <FilterHeader onClick={() => toggleFilterSection('rating')}>
              <FilterTitle>Değerlendirme</FilterTitle>
              {openFilterSections.rating ? <FaChevronUp /> : <FaChevronDown />}
            </FilterHeader>
            
            <FilterContent isOpen={openFilterSections.rating}>
              <FilterList>
                {[5, 4, 3, 2, 1].map(rating => (
                  <FilterItem key={rating}>
                    <FilterCheckbox>
                      <CheckboxInput 
                        type="checkbox" 
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating.toString())}
                        onChange={() => handleRatingChange(rating.toString())}
                      />
                      <CheckboxLabel htmlFor={`rating-${rating}`}>
                        {rating} Yıldız ve Üzeri
                      </CheckboxLabel>
                    </FilterCheckbox>
                  </FilterItem>
                ))}
              </FilterList>
            </FilterContent>
          </FilterSection>
          
          <FilterSection>
            <FilterHeader onClick={() => toggleFilterSection('discount')}>
              <FilterTitle>İndirimler</FilterTitle>
              {openFilterSections.discount ? <FaChevronUp /> : <FaChevronDown />}
            </FilterHeader>
            
            <FilterContent isOpen={openFilterSections.discount}>
              <FilterCheckbox>
                <CheckboxInput 
                  type="checkbox" 
                  id="discount"
                  checked={showDiscount}
                  onChange={() => setShowDiscount(!showDiscount)}
                />
                <CheckboxLabel htmlFor="discount">
                  İndirimdeki Ürünler
                </CheckboxLabel>
              </FilterCheckbox>
            </FilterContent>
          </FilterSection>
        </FilterSidebar>
        
        <ProductsGrid>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                addToCart={() => addToCart(product)}
              />
            ))
          ) : (
            <NoProductsFound>
              <h3>Ürün Bulunamadı</h3>
              <p>Lütfen filtrelerinizi değiştirerek tekrar deneyin.</p>
            </NoProductsFound>
          )}
        </ProductsGrid>
      </ProductsLayout>
    </ProductsContainer>
  )
}

export default ProductsPage