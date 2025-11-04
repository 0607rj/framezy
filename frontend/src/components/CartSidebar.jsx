import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay - Better UI */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="text-3xl" />
            <div>
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <p className="text-sm text-purple-100">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-300"
          >
            <FiX className="text-3xl" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="animate-bounce mb-6">
                <FiShoppingBag className="text-8xl text-gray-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some amazing products to get started!</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div 
                key={item._id} 
                className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-4 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group animate-slideInRight"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  />
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2 capitalize">{item.subcategory}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 h-10 transition-all duration-300"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-purple-100">
                  <div className="flex items-center gap-2 bg-white rounded-xl border-2 border-purple-200 p-1 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className="hover:bg-purple-100 rounded-lg p-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus className="text-purple-600 font-bold" />
                    </button>
                    <span className="font-bold text-gray-900 min-w-[35px] text-center text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, Math.min(item.stock, item.quantity + 1))}
                      className="hover:bg-purple-100 rounded-lg p-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={item.quantity >= item.stock}
                    >
                      <FiPlus className="text-purple-600 font-bold" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t-2 border-purple-100 p-6 bg-gradient-to-br from-purple-50 to-pink-50 space-y-4">
            {/* Subtotal */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 font-semibold">Subtotal</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Total Items</span>
                <span className="font-semibold text-gray-700">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className={`${totalPrice >= 500 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-300'} border-2 rounded-xl p-3 text-center`}>
              <p className={`text-sm font-semibold ${totalPrice >= 500 ? 'text-green-800' : 'text-orange-800'}`}>
                {totalPrice >= 500 ? '🎉 FREE Delivery on this order!' : `🚚 Add ₹${(500 - totalPrice).toFixed(2)} more for FREE delivery`}
              </p>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
            >
              <span>Proceed to Checkout</span>
              <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-white border-2 border-purple-300 text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
