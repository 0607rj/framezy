import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function ProductListPage() {
  const { categoryName, subcategoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products?category=${categoryName}&subcategory=${subcategoryName}`);
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, subcategoryName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link 
            to={`/category/${categoryName}`}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors duration-300 group"
          >
            <FiArrowLeft className="text-xl group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-semibold">Back to {categoryName}</span>
          </Link>
          
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 capitalize">{subcategoryName}</h1>
            <p className="text-lg lg:text-xl text-white/90">Explore our collection of premium {subcategoryName}</p>
          </div>
          
          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="text-white/90 text-sm mb-2">Available Products</p>
            <p className="text-3xl font-bold">{products.length} Items</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Yet</h3>
            <p className="text-gray-600 mb-8">Products will appear here once admin adds them.</p>
            <Link 
              to={`/category/${categoryName}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              <FiArrowLeft />
              <span>Back to Categories</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-slideUp border-2 border-gray-100 hover:border-purple-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/product/${product._id}`} className="relative h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 block">
                  <img
                    src={product.image || 'https://placehold.co/400x500/8b5cf6/ffffff?text=Product'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <FiEye className="text-purple-600 text-lg" />
                      <span className="text-gray-900 font-semibold">View Details</span>
                    </div>
                  </div>
                  
                  {/* Stock Badge */}
                  {product.stock > 0 ? (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl">
                      IN STOCK
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl">
                      OUT OF STOCK
                    </span>
                  )}
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 hover:scale-110">
                    <FiHeart className="text-pink-600 text-lg" />
                  </button>
                </Link>
                
                <div className="p-6 lg:p-8">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                    <span className="text-gray-600 text-sm ml-2 font-semibold">({product.rating || 0})</span>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-6 text-sm lg:text-base line-clamp-2">{product.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => addToCart(product, 1)}
                    disabled={product.stock === 0}
                    className={`w-full ${product.stock > 0 ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:shadow-2xl hover:scale-105' : 'bg-gray-400 cursor-not-allowed'} text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                  >
                    <FiShoppingCart className="text-xl" />
                    <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListPage;
