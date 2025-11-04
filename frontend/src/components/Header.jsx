import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiSearch, FiPackage } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50);
    });
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-xl' : 'bg-white/95 backdrop-blur-md'}`}>
      {/* Top Promo Bar */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2.5 text-center text-sm font-medium relative overflow-hidden animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        <p className="relative z-10">🎉 Free Shipping on orders above ₹500! ✨</p>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Famezy</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Frames That Inspire</p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 font-medium transition-all duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="/#categories" className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 font-medium transition-all duration-300 relative group">
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/#products" className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 font-medium transition-all duration-300 relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link to="/track-order" className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 font-medium transition-all duration-300 relative group flex items-center gap-1">
              <FiPackage className="w-4 h-4" />
              Track Order
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="/#about" className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 font-medium transition-all duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="/#contact" className="text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 font-medium transition-all duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <button className="hidden lg:block p-2 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 rounded-lg transition-all duration-300 group">
              <FiSearch className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 rounded-lg transition-all duration-300 group"
            >
              <FiShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse-slow">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition">Home</Link>
              <a href="/#categories" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition">Categories</a>
              <a href="/#products" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition">Products</a>
              <Link to="/track-order" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition flex items-center gap-2">
                <FiPackage className="w-4 h-4" />
                Track Order
              </Link>
              <a href="/#about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition">About</a>
              <a href="/#contact" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition">Contact</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
