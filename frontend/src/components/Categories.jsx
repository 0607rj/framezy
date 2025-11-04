import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function Categories() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch featured products from backend
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products?featured=true&limit=6`);
        const data = await response.json();
        setFeaturedProducts(data.data || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    {
      name: 'Posters',
      slug: 'posters',
      description: 'Premium wall art and decoration',
      icon: '🖼️',
      items: '25+ Items',
      bgColor: 'bg-gradient-to-br from-pink-100 to-rose-200',
      hoverBg: 'hover:from-pink-200 hover:to-rose-300',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-200'
    },
    {
      name: 'Skin Stickers',
      slug: 'stickers',
      description: 'Premium device skins & stickers',
      icon: '📱',
      items: '15+ Items',
      bgColor: 'bg-gradient-to-br from-purple-100 to-violet-200',
      hoverBg: 'hover:from-purple-200 hover:to-violet-300',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      name: 'Desk Mat',
      slug: 'desk-mat',
      description: 'Large gaming and office mats',
      icon: '🖥️',
      items: '8+ Items',
      bgColor: 'bg-gradient-to-br from-indigo-100 to-blue-200',
      hoverBg: 'hover:from-indigo-200 hover:to-blue-300',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-200'
    },
    {
      name: 'Calculator',
      slug: 'calculator',
      description: 'Calculator skins & covers',
      icon: '🔢',
      items: '5+ Items',
      bgColor: 'bg-gradient-to-br from-cyan-100 to-teal-200',
      hoverBg: 'hover:from-cyan-200 hover:to-teal-300',
      iconColor: 'text-cyan-600',
      borderColor: 'border-cyan-200'
    },
    {
      name: 'Skins',
      slug: 'skins',
      description: 'Custom device skins',
      icon: '🎨',
      items: '12+ Items',
      bgColor: 'bg-gradient-to-br from-orange-100 to-amber-200',
      hoverBg: 'hover:from-orange-200 hover:to-amber-300',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    },
    {
      name: 'Covers',
      slug: 'covers',
      description: 'Protective covers',
      icon: '📔',
      items: '6+ Items',
      bgColor: 'bg-gradient-to-br from-emerald-100 to-green-200',
      hoverBg: 'hover:from-emerald-200 hover:to-green-300',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Categories Section */}
        <div id="categories" className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">Shop by Category</h2>
          <p className="text-gray-600 text-base lg:text-xl max-w-2xl mx-auto">Browse our wide range of premium products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24 lg:mb-40">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.slug}`}
              className="animate-slideUp block"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl p-6 lg:p-8 ${category.bgColor} ${category.hoverBg} hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105 border-2 ${category.borderColor}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="text-5xl lg:text-6xl mb-4 lg:mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">{category.icon}</div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3 relative z-10">{category.name}</h3>
                <p className="text-gray-700 mb-4 lg:mb-6 text-sm lg:text-base leading-relaxed relative z-10">{category.description}</p>
                <div className="flex items-center justify-between relative z-10">
                  <span className={`${category.iconColor} font-bold text-base lg:text-lg`}>{category.items}</span>
                  <FiArrowRight className={`${category.iconColor} text-lg lg:text-xl group-hover:translate-x-3 transition-transform duration-300`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <div id="products" className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">Featured Products</h2>
          <p className="text-gray-600 text-base lg:text-xl max-w-2xl mx-auto">Handpicked bestsellers for you</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading featured products...</p>
            </div>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎨</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Featured Products Yet</h3>
            <p className="text-gray-600">Featured products will appear here once admin adds them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-slideUp border-2 border-gray-100 hover:border-purple-200"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img 
                    src={product.image || 'https://placehold.co/400x500/8b5cf6/ffffff?text=Product'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
                  />
                  {product.stock > 0 ? (
                    <span className="absolute top-4 lg:top-6 left-4 lg:left-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 lg:px-5 py-1.5 lg:py-2 rounded-xl lg:rounded-2xl text-xs lg:text-sm font-bold shadow-xl">
                      IN STOCK
                    </span>
                  ) : (
                    <span className="absolute top-4 lg:top-6 left-4 lg:left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 lg:px-5 py-1.5 lg:py-2 rounded-xl lg:rounded-2xl text-xs lg:text-sm font-bold shadow-xl">
                      OUT OF STOCK
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-1 mb-3 lg:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-base lg:text-lg ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                    <span className="text-gray-600 text-xs lg:text-sm ml-2 font-semibold">({product.rating || 0})</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 lg:mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <div>
                      <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">₹{product.price}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full ${product.stock > 0 ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:shadow-2xl hover:scale-105' : 'bg-gray-400 cursor-not-allowed'} text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group/btn`}
                  >
                    <span className="relative z-10">{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                    {product.stock > 0 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;

