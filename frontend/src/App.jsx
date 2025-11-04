import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/footer'
import CartSidebar from './components/CartSidebar'
import Toast from './components/Toast'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductListPage from './pages/ProductListPage'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import './App.css'

function AppContent() {
  const { showToast, setShowToast, toastMessage, isCartOpen } = useCart();

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Main content wrapper with blur effect when cart is open */}
        <div className={`transition-all duration-300 ${isCartOpen ? 'blur-[2px]' : ''}`}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/category/:categoryName/:subcategoryName" element={<ProductListPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
          <Footer />
        </div>
        <CartSidebar />
        <Toast 
          message={toastMessage} 
          show={showToast} 
          onClose={() => setShowToast(false)} 
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App
