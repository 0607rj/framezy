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

        {/* IMPORTANT: Save Your Order ID - Elegant Section */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-purple-200">
          <div className="text-center mb-6">
            <div className="inline-block bg-purple-100 rounded-full px-4 py-2 mb-3">
              <p className="text-sm font-semibold text-purple-700">📋 Important Information</p>
            </div>
            <p className="text-gray-600 text-sm">Save this Order ID to track your order anytime</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-center text-gray-500 text-sm mb-3">Your Order ID</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 rounded-lg border border-purple-200">
                <p className="text-xl md:text-2xl font-mono text-gray-700 tracking-wide">
                  {orderId}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(orderId);
                  alert('✓ Order ID copied!');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md text-sm flex items-center gap-2"
                title="Copy Order ID"
              >
                <span>📋</span>
                <span>Copy ID</span>
              </button>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-center text-blue-800 font-medium text-sm mb-3">� How to Track Your Order</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg">
                  <span className="text-blue-600 font-semibold flex-shrink-0">1.</span>
                  <span className="text-gray-600">Save this Order ID</span>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg">
                  <span className="text-blue-600 font-semibold flex-shrink-0">2.</span>
                  <span className="text-gray-600">Click "Track Order" below</span>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg">
                  <span className="text-blue-600 font-semibold flex-shrink-0">3.</span>
                  <span className="text-gray-600">Enter Order ID & Email/Phone</span>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-lg">
                  <span className="text-blue-600 font-semibold flex-shrink-0">4.</span>
                  <span className="text-gray-600">View real-time status</span>
                </div>
              </div>
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
