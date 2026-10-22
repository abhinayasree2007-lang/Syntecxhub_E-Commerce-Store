import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { api } from './services/api';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import ProductModal from './components/ProductModal';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import MyOrdersPage from './pages/MyOrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Navigation states
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [lastCreatedOrder, setLastCreatedOrder] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const fetchCatalog = async () => {
    try {
      setLoadingProducts(true);
      const data = await api.products.getAll();
      setProducts(data.products || []);
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    navigateTo('product-details');
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    navigateTo('products');
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    navigateTo('products');
  };

  const handleOrderSuccess = (order) => {
    setLastCreatedOrder(order);
    navigateTo('order-confirmation');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onSearch={handleSearch}
      />

      {/* Main Page View */}
      <main style={{ flex: 1 }}>
        {currentRoute === 'home' && (
          <HomePage
            products={products}
            loading={loadingProducts}
            onNavigate={navigateTo}
            onSelectCategory={handleSelectCategory}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'products' && (
          <ProductsPage
            products={products}
            loading={loadingProducts}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchKeyword={searchKeyword}
            onSearch={setSearchKeyword}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'product-details' && (
          <ProductDetailsPage
            productId={selectedProductId}
            onBack={() => navigateTo('products')}
            onNavigateLogin={() => navigateTo('login')}
          />
        )}

        {currentRoute === 'cart' && (
          <CartPage
            onNavigateCheckout={() => navigateTo('checkout')}
            onNavigateProducts={() => navigateTo('products')}
          />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutPage
            onOrderSuccess={handleOrderSuccess}
            onNavigateLogin={() => navigateTo('login')}
          />
        )}

        {currentRoute === 'order-confirmation' && (
          <OrderConfirmationPage
            order={lastCreatedOrder}
            onNavigateOrders={() => navigateTo('my-orders')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {currentRoute === 'my-orders' && (
          <MyOrdersPage
            onNavigateProducts={() => navigateTo('products')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentRoute === 'login' && (
          <LoginPage
            onNavigateRegister={() => navigateTo('register')}
            onLoginSuccess={() => {
              fetchCatalog();
              navigateTo('home');
            }}
          />
        )}

        {currentRoute === 'register' && (
          <RegisterPage
            onNavigateLogin={() => navigateTo('login')}
            onRegisterSuccess={() => {
              fetchCatalog();
              navigateTo('home');
            }}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminDashboardPage
            onNavigateHome={() => navigateTo('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onNavigateCheckout={() => navigateTo('checkout')}
        onNavigateCart={() => navigateTo('cart')}
      />

      {/* Interactive Quick View Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onNavigateDetails={(id) => handleSelectProduct(id)}
        />
      )}

      {/* Bottom Floating Toast Notification */}
      <Toast />

      {/* Footer */}
      <Footer
        onNavigateCategory={handleSelectCategory}
        onNavigate={navigateTo}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
