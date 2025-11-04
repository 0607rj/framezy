import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiMinus, FiPlus, FiPackage, FiTruck, FiShield, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
        setSelectedImage(data.data.image);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/" className="text-purple-600 hover:text-purple-700 font-semibold">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 group"
          >
            <FiArrowLeft className="text-xl group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-semibold">Back</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <img 
                src={selectedImage || product.image} 
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
                onClick={() => window.open(selectedImage || product.image, '_blank')}
              />
            </div>
            
            {/* Stock Badge */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <FiPackage className="text-2xl text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Stock Available</p>
                  <p className="font-bold text-gray-900">{product.stock} units</p>
                </div>
              </div>
              {product.stock < 10 && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Only {product.stock} left!
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Subcategory */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                {product.category}
              </span>
              <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-semibold">
                {product.subcategory}
              </span>
              {product.featured && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <FiStar className="fill-current" />
                  Featured
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating.toFixed(1)} Rating
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
              <p className="text-sm text-gray-600 mb-1">Price</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ₹{product.price}
              </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-xl flex items-center justify-center transition-colors font-bold text-xl"
                >
                  <FiMinus />
                </button>
                <span className="text-3xl font-bold text-gray-900 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-xl flex items-center justify-center transition-colors font-bold text-xl"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              <FiShoppingCart className="text-2xl" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FiTruck className="text-2xl text-green-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders above ₹500</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FiShield className="text-2xl text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                  <FiPackage className="text-2xl text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Premium Quality</p>
                <p className="text-xs text-gray-500">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
