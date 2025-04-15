// DataService.js
// Bu servis, ürün ve sipariş verilerini yönetmek için kullanılacak
// Gerçek bir uygulamada bu veriler bir backend API'den gelecektir

// Local Storage anahtarları
const PRODUCTS_KEY = 'e-commerce-products';
const ORDERS_KEY = 'e-commerce-orders';
const USERS_KEY = 'e-commerce-users';

// Örnek ürün verileri
const sampleProducts = [
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
  },
  {
    id: 2,
    name: 'Kablosuz Kulaklık',
    price: 1299.99,
    oldPrice: null,
    image: 'https://via.placeholder.com/300x300',
    category: 'Elektronik',
    brand: 'AudioMax',
    description: 'Yüksek ses kalitesi ve uzun pil ömrü sunan kablosuz kulaklık.',
    stock: 25,
    isNew: true,
    isSale: false,
    rating: 4.2,
    reviewCount: 45,
  },
];

// Örnek sipariş verileri
const sampleOrders = [
  {
    id: 1001,
    customerName: 'Ahmet Yılmaz',
    customerEmail: 'ahmet@example.com',
    date: '2023-08-15',
    status: 'Tamamlandı',
    total: 7999.99,
    items: [
      { id: 1, name: 'Akıllı Telefon X', quantity: 1, price: 7999.99 }
    ],
    address: 'Örnek Mahallesi, Örnek Sokak No:1, İstanbul',
    paymentMethod: 'Kredi Kartı',
  },
];

// Örnek kullanıcı verileri
const sampleUsers = [
  {
    id: 1,
    name: 'Admin Kullanıcı',
    email: 'admin@example.com',
    password: 'admin123', // Gerçek uygulamada şifreler hash'lenmeli
    role: 'admin',
    createdAt: '2023-01-01',
  },
  {
    id: 2,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    password: 'user123',
    role: 'user',
    createdAt: '2023-02-15',
  },
  {
    id: 3,
    name: 'Test Admin',
    email: 'kullanici@ornek.com',
    password: 'sifre123',
    role: 'admin',
    createdAt: '2024-01-01',
  },
];

// Verileri Local Storage'dan yükleme
const loadData = (key, sampleData) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    // İlk kez çalıştırılıyorsa örnek verileri kaydet
    localStorage.setItem(key, JSON.stringify(sampleData));
    return sampleData;
  }
};

// Verileri Local Storage'a kaydetme
const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Ürün işlemleri
export const getProducts = () => {
  return loadData(PRODUCTS_KEY, sampleProducts);
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(product => product.id === parseInt(id));
};

export const addProduct = (product) => {
  const products = getProducts();
  // Yeni ID oluştur
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { ...product, id: newId };
  products.push(newProduct);
  saveData(PRODUCTS_KEY, products);
  return newProduct;
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    saveData(PRODUCTS_KEY, products);
    return updatedProduct;
  }
  return null;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  saveData(PRODUCTS_KEY, filteredProducts);
  return id;
};

// Sipariş işlemleri
export const getOrders = () => {
  return loadData(ORDERS_KEY, sampleOrders);
};

export const getOrderById = (id) => {
  const orders = getOrders();
  return orders.find(order => order.id === parseInt(id));
};

export const addOrder = (order) => {
  const orders = getOrders();
  // Yeni ID oluştur
  const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1001;
  const newOrder = { ...order, id: newId, date: new Date().toISOString().split('T')[0] };
  orders.push(newOrder);
  saveData(ORDERS_KEY, orders);
  return newOrder;
};

export const updateOrderStatus = (id, status) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === parseInt(id));
  if (index !== -1) {
    orders[index].status = status;
    saveData(ORDERS_KEY, orders);
    return orders[index];
  }
  return null;
};

// Kullanıcı işlemleri
export const getUsers = () => {
  return loadData(USERS_KEY, sampleUsers);
};

export const getUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const authenticateUser = (email, password) => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const addUser = (user) => {
  const users = getUsers();
  // Yeni ID oluştur
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { 
    ...user, 
    id: newId, 
    role: 'user', // Yeni kullanıcılar varsayılan olarak 'user' rolüne sahip
    createdAt: new Date().toISOString().split('T')[0] 
  };
  users.push(newUser);
  saveData(USERS_KEY, users);
  return newUser;
};

// İstatistik işlemleri
export const getStats = () => {
  const products = getProducts();
  const orders = getOrders();
  const users = getUsers().filter(user => user.role === 'user');
  
  // Son 30 günlük siparişleri filtrele
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    return orderDate >= thirtyDaysAgo;
  });
  
  // Toplam satış tutarı
  const totalSales = recentOrders.reduce((sum, order) => sum + order.total, 0);
  
  return {
    totalSales,
    orderCount: recentOrders.length,
    productCount: products.length,
    userCount: users.length
  };
};

// Kategori işlemleri
export const getCategories = () => {
  const products = getProducts();
  const categories = [...new Set(products.map(product => product.category))];
  return categories;
};

// Arama işlemleri
export const searchProducts = (query) => {
  const products = getProducts();
  const lowerCaseQuery = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) ||
    product.description?.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery) ||
    product.brand?.toLowerCase().includes(lowerCaseQuery)
  );
};

// Filtreleme işlemleri
export const filterProducts = (filters) => {
  let products = getProducts();
  
  if (filters.category) {
    products = products.filter(product => product.category === filters.category);
  }
  
  if (filters.minPrice) {
    products = products.filter(product => product.price >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    products = products.filter(product => product.price <= filters.maxPrice);
  }
  
  if (filters.inStock) {
    products = products.filter(product => product.stock > 0);
  }
  
  return products;
};

// Veri servisi nesnesi
const DataService = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  getOrderById,
  addOrder,
  updateOrderStatus,
  getUsers,
  getUserByEmail,
  authenticateUser,
  addUser,
  getStats,
  getCategories,
  searchProducts,
  filterProducts
};

export default DataService;