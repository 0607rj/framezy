import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiMail, FiPhone, FiMapPin, FiHome, FiTruck } from 'react-icons/fi';

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, orderData } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 pt-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="inline-block relative animate-celebration">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float">
              <FiCheckCircle className="text-white text-6xl" />
            </div>
            {/* Sparkle effects */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-sparkle" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-0 -left-8 w-4 h-4 bg-purple-400 rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -top-8 left-0 w-5 h-5 bg-blue-400 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">Thank you for shopping with Famezy!</p>
          <p className="text-gray-500">We'll contact you soon to confirm delivery details.</p>
        </div>

        {/* IMPORTANT: Save Your Order ID - Prominent Section */}
        <div className="bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 rounded-3xl shadow-2xl p-8 mb-8 border-4 border-orange-400 animate-pulse-slow">
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-orange-800 mb-2">⚠️ IMPORTANT - SAVE THIS ORDER ID ⚠️</p>
            <p className="text-gray-700 font-semibold">You'll need this to track your order!</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border-3 border-orange-300">
            <p className="text-center text-gray-600 font-semibold mb-3">Your Order ID</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <p className="text-4xl md:text-5xl font-bold text-gray-900 font-mono bg-yellow-100 px-8 py-4 rounded-xl border-2 border-yellow-400">
                {orderId}
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(orderId);
                  alert('Order ID copied to clipboard!');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg"
                title="Copy Order ID"
              >
                📋 Copy
              </button>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
              <p className="text-center text-orange-800 font-bold text-lg mb-2">📝 How to Track Your Order:</p>
              <ol className="text-gray-700 space-y-2 text-left max-w-2xl mx-auto">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-orange-600">1.</span>
                  <span><strong>Save this Order ID</strong> by taking a screenshot or writing it down</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-orange-600">2.</span>
                  <span>Click <strong>"Track Your Order"</strong> button below</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-orange-600">3.</span>
                  <span>Enter your <strong>Order ID</strong> and <strong>Email/Phone</strong> used during checkout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-orange-600">4.</span>
                  <span>View your order status anytime!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-100">
          {/* Order Status */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border-2 border-purple-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Status</p>
                <p className="text-2xl font-bold text-gray-900">{orderData?.orderStatus || 'Pending'}</p>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                <FiPackage />
                Processing
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FiPackage className="text-purple-600" />
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FiPackage className="text-purple-600" />
                  <span className="font-semibold text-gray-700">Customer Name</span>
                </div>
                <p className="text-gray-900 font-medium ml-8">{orderData?.customerName}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FiMail className="text-purple-600" />
                  <span className="font-semibold text-gray-700">Email</span>
                </div>
                <p className="text-gray-900 font-medium ml-8">{orderData?.email}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FiPhone className="text-purple-600" />
                  <span className="font-semibold text-gray-700">Phone</span>
                </div>
                <p className="text-gray-900 font-medium ml-8">{orderData?.phone}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FiMapPin className="text-purple-600" />
                  <span className="font-semibold text-gray-700">Pincode</span>
                </div>
                <p className="text-gray-900 font-medium ml-8">{orderData?.pincode}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <FiHome className="text-purple-600" />
                  <span className="font-semibold text-gray-700">Delivery Address</span>
                </div>
                <p className="text-gray-900 font-medium ml-8">
                  {orderData?.address}, {orderData?.city}, {orderData?.state} - {orderData?.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
            <div className="space-y-4">
              {orderData?.items?.map((item, index) => (
                <div key={index} className="flex gap-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{item.productName}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="font-bold text-purple-600 mt-2">₹{item.price} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{orderData?.totalAmount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Payment Method</span>
                <span className="font-semibold">Cash on Delivery</span>
              </div>
              <div className="border-t-2 border-purple-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ₹{orderData?.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Order Received</h3>
                <p className="text-gray-600 text-sm">We have received your order and will start processing it immediately</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-purple-600">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Quality Check & Packaging</h3>
                <p className="text-gray-600 text-sm">Your items will be carefully checked and packed with premium quality materials</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-pink-600">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Local Delivery</h3>
                <p className="text-gray-600 text-sm">We'll deliver your order to your doorstep within 3-5 business days</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-green-600">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Payment on Delivery</h3>
                <p className="text-gray-600 text-sm">Pay ₹{orderData?.totalAmount?.toFixed(2)} in cash when you receive your order</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
            <p className="text-gray-700 text-sm">
              <strong>Need help?</strong> Call us at <span className="font-bold text-purple-600">{orderData?.phone}</span> or we'll contact you soon to confirm your delivery!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center"
          >
            Continue Shopping
          </Link>
          <Link
            to="/track-order"
            state={{ prefilledOrderId: orderId }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center gap-2"
          >
            <FiTruck className="text-xl" />
            Track Your Order
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-white border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 text-center"
          >
            Print Order Details
          </button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You! 💜</h3>
          <p className="text-gray-700">
            We appreciate your order and look forward to serving you again!
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
