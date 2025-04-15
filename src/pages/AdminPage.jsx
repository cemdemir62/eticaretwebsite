import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaPlus, FaEdit, FaTrash, FaBox, FaShoppingBag, FaChartLine, FaUsers, FaCog } from 'react-icons/fa'
import DataService from '../services/DataService'

function AdminPage() {
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState({})
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: '',
    description: '',
    stock: '',
    image: '',
    images: [],
    isNew: false,
    isSale: false
  })

  // Verileri yükle
  useEffect(() => {
    loadData()
  }, [])
  
  const loadData = () => {
    // DataService'den verileri al
    const productsData = DataService.getProducts()
    const ordersData = DataService.getOrders()
    const statsData = DataService.getStats()
    
    setProducts(productsData)
    setOrders(ordersData)
    setStats(statsData)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock),
    }
    DataService.addProduct(newProduct)
    loadData() // Verileri yeniden yükle
    resetForm()
  }

  const handleUpdateProduct = (e) => {
    e.preventDefault()
    const updatedProduct = {
      ...editingProduct,
      ...formData,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock),
    }
    DataService.updateProduct(updatedProduct)
    loadData() // Verileri yeniden yükle
    setEditingProduct(null)
    resetForm()
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      oldPrice: product.oldPrice ? product.oldPrice.toString() : '',
      category: product.category,
      description: product.description || '',
      stock: product.stock.toString(),
      image: product.image,
      images: product.images || [],
      isNew: product.isNew,
      isSale: product.isSale
    })
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      DataService.deleteProduct(productId)
      loadData() // Verileri yeniden yükle
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      oldPrice: '',
      category: '',
      description: '',
      stock: '',
      image: '',
      images: [],
      isNew: false,
      isSale: false
    })
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <h1>Yönetici Paneli</h1>
      </AdminHeader>

      <AdminLayout>
        <AdminSidebar>
          <SidebarItem 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')}
          >
            <FaBox /> Ürünler
          </SidebarItem>
          <SidebarItem 
            active={activeTab === 'orders'} 
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingBag /> Siparişler
          </SidebarItem>
          <SidebarItem 
            active={activeTab === 'stats'} 
            onClick={() => setActiveTab('stats')}
          >
            <FaChartLine /> İstatistikler
          </SidebarItem>
          <SidebarItem 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> Kullanıcılar
          </SidebarItem>
          <SidebarItem 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Ayarlar
          </SidebarItem>
        </AdminSidebar>

        <AdminContent>
          {activeTab === 'products' && (
            <TabContent>
              <TabHeader>
                <h2>Ürün Yönetimi</h2>
                <ActionButton onClick={() => {
                  setEditingProduct(null)
                  resetForm()
                }}>
                  <FaPlus /> Yeni Ürün
                </ActionButton>
              </TabHeader>

              <FormSection>
                <h3>{editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h3>
                <ProductForm onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                  <FormGroup>
                    <label htmlFor="name">Ürün Adı</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <label htmlFor="price">Fiyat (TL)</label>
                      <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleInputChange} 
                        required 
                        min="0" 
                        step="0.01" 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="oldPrice">Eski Fiyat (TL, opsiyonel)</label>
                      <input 
                        type="number" 
                        id="oldPrice" 
                        name="oldPrice" 
                        value={formData.oldPrice} 
                        onChange={handleInputChange} 
                        min="0" 
                        step="0.01" 
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <label htmlFor="category">Kategori</label>
                      <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="stock">Stok Adedi</label>
                      <input 
                        type="number" 
                        id="stock" 
                        name="stock" 
                        value={formData.stock} 
                        onChange={handleInputChange} 
                        required 
                        min="0" 
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <label htmlFor="image">Ürün Görseli URL</label>
                    <input 
                      type="text" 
                      id="image" 
                      name="image" 
                      value={formData.image} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="description">Ürün Açıklaması</label>
                    <textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      rows="4" 
                    />
                  </FormGroup>

                  <FormRow>
                    <CheckboxGroup>
                      <input 
                        type="checkbox" 
                        id="isNew" 
                        name="isNew" 
                        checked={formData.isNew} 
                        onChange={handleInputChange} 
                      />
                      <label htmlFor="isNew">Yeni Ürün</label>
                    </CheckboxGroup>

                    <CheckboxGroup>
                      <input 
                        type="checkbox" 
                        id="isSale" 
                        name="isSale" 
                        checked={formData.isSale} 
                        onChange={handleInputChange} 
                      />
                      <label htmlFor="isSale">İndirimli Ürün</label>
                    </CheckboxGroup>
                  </FormRow>

                  <FormActions>
                    <SubmitButton type="submit">
                      {editingProduct ? 'Güncelle' : 'Ekle'}
                    </SubmitButton>
                    {editingProduct && (
                      <CancelButton type="button" onClick={() => {
                        setEditingProduct(null)
                        resetForm()
                      }}>
                        İptal
                      </CancelButton>
                    )}
                  </FormActions>
                </ProductForm>
              </FormSection>

              <TableSection>
                <h3>Ürün Listesi</h3>
                {products.length > 0 ? (
                  <ProductTable>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Görsel</th>
                        <th>Ürün Adı</th>
                        <th>Kategori</th>
                        <th>Fiyat</th>
                        <th>Stok</th>
                        <th>Durum</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>
                            <ProductImage src={product.image} alt={product.name} />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>
                            {product.price.toLocaleString('tr-TR')} TL
                            {product.oldPrice && (
                              <OldPrice>{product.oldPrice.toLocaleString('tr-TR')} TL</OldPrice>
                            )}
                          </td>
                          <td>{product.stock}</td>
                          <td>
                            <StatusBadges>
                              {product.isNew && <Badge className="new">Yeni</Badge>}
                              {product.isSale && <Badge className="sale">İndirim</Badge>}
                            </StatusBadges>
                          </td>
                          <td>
                            <ActionButtons>
                              <ActionButton small onClick={() => handleEditProduct(product)}>
                                <FaEdit />
                              </ActionButton>
                              <ActionButton small danger onClick={() => handleDeleteProduct(product.id)}>
                                <FaTrash />
                              </ActionButton>
                            </ActionButtons>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </ProductTable>
                ) : (
                  <EmptyMessage>Henüz ürün bulunmuyor.</EmptyMessage>
                )}
              </TableSection>
            </TabContent>
          )}

          {activeTab === 'orders' && (
            <TabContent>
              <TabHeader>
                <h2>Sipariş Yönetimi</h2>
              </TabHeader>

              <TableSection>
                {orders.length > 0 ? (
                  <OrderTable>
                    <thead>
                      <tr>
                        <th>Sipariş No</th>
                        <th>Müşteri</th>
                        <th>Tarih</th>
                        <th>Tutar</th>
                        <th>Durum</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.customerName}</td>
                          <td>{order.date}</td>
                          <td>{order.total.toLocaleString('tr-TR')} TL</td>
                          <td>
                            <OrderStatus status={order.status}>{order.status}</OrderStatus>
                          </td>
                          <td>
                            <ActionButtons>
                              <select 
                                value={order.status}
                                onChange={(e) => {
                                  const newStatus = e.target.value;
                                  DataService.updateOrderStatus(order.id, newStatus);
                                  loadData();
                                }}
                                style={{ marginRight: '10px' }}
                              >
                                <option value="Beklemede">Beklemede</option>
                                <option value="İşleniyor">İşleniyor</option>
                                <option value="Kargoya Verildi">Kargoya Verildi</option>
                                <option value="Tamamlandı">Tamamlandı</option>
                                <option value="İptal Edildi">İptal Edildi</option>
                              </select>
                              <ActionButton small>
                                <FaEdit />
                              </ActionButton>
                            </ActionButtons>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </OrderTable>
                ) : (
                  <EmptyMessage>Henüz sipariş bulunmuyor.</EmptyMessage>
                )}
              </TableSection>
            </TabContent>
          )}

          {activeTab === 'stats' && (
            <TabContent>
              <TabHeader>
                <h2>İstatistikler</h2>
              </TabHeader>
              <StatsGrid>
                <StatCard>
                  <StatTitle>Toplam Satış</StatTitle>
                  <StatValue>{stats.totalSales?.toLocaleString('tr-TR')} TL</StatValue>
                  <StatDescription>Son 30 gün</StatDescription>
                </StatCard>
                <StatCard>
                  <StatTitle>Sipariş Sayısı</StatTitle>
                  <StatValue>{stats.orderCount}</StatValue>
                  <StatDescription>Son 30 gün</StatDescription>
                </StatCard>
                <StatCard>
                  <StatTitle>Ürün Sayısı</StatTitle>
                  <StatValue>{stats.productCount}</StatValue>
                  <StatDescription>Toplam</StatDescription>
                </StatCard>
                <StatCard>
                  <StatTitle>Müşteri Sayısı</StatTitle>
                  <StatValue>{stats.userCount}</StatValue>
                  <StatDescription>Toplam</StatDescription>
                </StatCard>
              </StatsGrid>
            </TabContent>
          )}

          {activeTab === 'users' && (
            <TabContent>
              <TabHeader>
                <h2>Kullanıcı Yönetimi</h2>
              </TabHeader>
              <EmptyMessage>Bu özellik henüz geliştirme aşamasındadır.</EmptyMessage>
            </TabContent>
          )}

          {activeTab === 'settings' && (
            <TabContent>
              <TabHeader>
                <h2>Site Ayarları</h2>
              </TabHeader>
              <EmptyMessage>Bu özellik henüz geliştirme aşamasındadır.</EmptyMessage>
            </TabContent>
          )}
        </AdminContent>
      </AdminLayout>
    </AdminContainer>
  )
}

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const AdminHeader = styled.div`
  margin-bottom: 20px;
  
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
  }
`

const AdminLayout = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const AdminSidebar = styled.div`
  width: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 10px;
  }
`

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  background-color: ${({ active }) => active ? '#ff4500' : 'transparent'};
  color: ${({ active }) => active ? 'white' : '#555'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active }) => active ? '#ff4500' : '#e0e0e0'};
  }
  
  svg {
    margin-right: 10px;
  }
  
  @media (max-width: 768px) {
    margin: 0 5px;
    white-space: nowrap;
  }
`

const AdminContent = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
`

const TabContent = styled.div`
`

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`

const FormSection = styled.section`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 15px;
    color: #333;
  }
`

const TableSection = styled.section`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 15px;
    color: #333;
  }
`

const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
  label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #555;
  }
  
  input, textarea, select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #ff4500;
    }
  }
  
  textarea {
    resize: vertical;
  }
`

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  
  input {
    margin: 0;
  }
  
  label {
    margin: 0;
  }
`

const FormActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const SubmitButton = styled(Button)`
  background-color: #ff4500;
  color: white;
  
  &:hover {
    background-color: #e03e00;
  }
`

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #555;
  
  &:hover {
    background-color: #e0e0e0;
  }
`

const ActionButton = styled(Button)`
  background-color: ${({ danger }) => danger ? '#ff4500' : '#f0f0f0'};
  color: ${({ danger }) => danger ? 'white' : '#555'};
  padding: ${({ small }) => small ? '6px 10px' : '10px 15px'};
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background-color: ${({ danger }) => danger ? '#e03e00' : '#e0e0e0'};
  }
  
  svg {
    font-size: ${({ small }) => small ? '14px' : '16px'};
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 5px;
`

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-weight: 500;
    color: #333;
    background-color: #f5f5f5;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
  
  @media (max-width: 992px) {
    display: block;
    overflow-x: auto;
  }
`

const OrderTable = styled(ProductTable)`
`

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`

const OldPrice = styled.div`
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
`

const StatusBadges = styled.div`
  display: flex;
  gap: 5px;
`

const Badge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  
  &.new {
    background-color: #4caf50;
    color: white;
  }
  
  &.sale {
    background-color: #ff4500;
    color: white;
  }
`

const OrderStatus = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Tamamlandı': return '#4caf50';
      case 'İşleniyor': return '#2196f3';
      case 'İptal Edildi': return '#f44336';
      default: return '#757575';
    }
  }};
  color: white;
`

const EmptyMessage = styled.div`
  text-align: center;
  padding: 30px;
  color: #777;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
`

const StatTitle = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
`

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`

const StatDescription = styled.div`
  font-size: 12px;
  color: #999;
`

export default AdminPage