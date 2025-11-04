import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiPackage, FiSearch, FiMail, FiPhone, FiMapPin, FiCalendar, FiDollarSign, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';

function TrackOrder() {
  const location = useLocation();
  const prefilledOrderId = location.state?.prefilledOrderId || '';
  
  const [orderId, setOrderId] = useState(prefilledOrderId);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [useEmail, setUseEmail] = useState(true);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);

    if (!orderId) {
      setError('Please enter your order ID');
      return;
    }

    if (useEmail && !email) {
      setError('Please enter your email address');
      return;
    }

    if (!useEmail && !phone) {
      setError('Please enter your phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId.trim(),
          email: useEmail ? email.trim() : undefined,
          phone: !useEmail ? phone.trim() : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOrder(data.data);
      } else {
        setError(data.message || 'Order not found. Please check your details.');
      }
    } catch (err) {
      setError('Failed to track order. Please try again.');
      console.error('Error tracking order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-300',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-300',
      'Delivered': 'bg-green-100 text-green-800 border-green-300',
      'Cancelled': 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FiClock className="text-4xl" />;
      case 'Processing':
        return <FiPackage className="text-4xl" />;
      case 'Shipped':
        return <FiTruck className="text-4xl" />;
      case 'Delivered':
        return <FiCheckCircle className="text-4xl" />;
      default:
        return <FiPackage className="text-4xl" />;
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Pending':
        return 25;
      case 'Processing':
        return 50;
      case 'Shipped':
        return 75;
      case 'Delivered':
        return 100;
      case 'Cancelled':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 pt-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-2xl mb-4">
            <FiSearch className="text-4xl" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-lg">Enter your order details to check the status</p>
        </div>

        {/* Track Order Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-100">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            {/* Order ID */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                <FiPackage className="inline mr-2" />
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., 67123abc456def789ghi)"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                You can find your order ID in the order confirmation
              </p>
            </div>

            {/* Toggle between Email and Phone */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => setUseEmail(true)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  useEmail
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiMail className="inline mr-2" />
                Use Email
              </button>
              <button
                type="button"
                onClick={() => setUseEmail(false)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  !useEmail
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiPhone className="inline mr-2" />
                Use Phone
              </button>
            </div>

            {/* Email Input */}
            {useEmail && (
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  <FiMail className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                />
              </div>
            )}

            {/* Phone Input */}
            {!useEmail && (
              <div>
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  <FiPhone className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-5 px-8 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </span>
              ) : (
                <>
                  <FiSearch className="inline mr-2" />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Details */}
        {order && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100 animate-fadeIn">
            {/* Order Status Header */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border-2 border-purple-200">
              <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="text-2xl font-bold text-gray-900 font-mono">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  {order.trackingId && (
                    <p className="text-sm text-gray-600 mt-1">
                      Tracking ID: <span className="font-semibold">{order.trackingId}</span>
                    </p>
                  )}
                </div>
                <div className={`px-6 py-3 rounded-xl border-2 font-bold text-lg ${getStatusColor(order.orderStatus)}`}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.orderStatus)}
                    <span>{order.orderStatus}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {order.orderStatus !== 'Cancelled' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Order Progress</span>
                    <span className="font-semibold">{getProgressPercentage(order.orderStatus)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(order.orderStatus)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Order Timeline */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className={`text-center p-3 rounded-xl ${getProgressPercentage(order.orderStatus) >= 25 ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  <FiClock className={`text-2xl mx-auto mb-2 ${getProgressPercentage(order.orderStatus) >= 25 ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-xs font-semibold ${getProgressPercentage(order.orderStatus) >= 25 ? 'text-purple-600' : 'text-gray-400'}`}>Pending</p>
                </div>
                <div className={`text-center p-3 rounded-xl ${getProgressPercentage(order.orderStatus) >= 50 ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  <FiPackage className={`text-2xl mx-auto mb-2 ${getProgressPercentage(order.orderStatus) >= 50 ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-xs font-semibold ${getProgressPercentage(order.orderStatus) >= 50 ? 'text-purple-600' : 'text-gray-400'}`}>Processing</p>
                </div>
                <div className={`text-center p-3 rounded-xl ${getProgressPercentage(order.orderStatus) >= 75 ? 'bg-purple-100' : 'bg-gray-100'}`}>
                  <FiTruck className={`text-2xl mx-auto mb-2 ${getProgressPercentage(order.orderStatus) >= 75 ? 'text-purple-600' : 'text-gray-400'}`} />
                  <p className={`text-xs font-semibold ${getProgressPercentage(order.orderStatus) >= 75 ? 'text-purple-600' : 'text-gray-400'}`}>Shipped</p>
                </div>
                <div className={`text-center p-3 rounded-xl ${getProgressPercentage(order.orderStatus) === 100 ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <FiCheckCircle className={`text-2xl mx-auto mb-2 ${getProgressPercentage(order.orderStatus) === 100 ? 'text-green-600' : 'text-gray-400'}`} />
                  <p className={`text-xs font-semibold ${getProgressPercentage(order.orderStatus) === 100 ? 'text-green-600' : 'text-gray-400'}`}>Delivered</p>
                </div>
              </div>
            </div>

            {/* Order Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Customer Details */}
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FiPackage className="text-purple-600" />
                  Customer Details
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span> {order.customerName}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FiMapPin className="text-purple-600" />
                    <span>
                      {order.address}, {order.city}, {order.state} - {order.pincode}
                    </span>
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FiCalendar className="text-pink-600" />
                  Order Details
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Order Date:</span>{' '}
                    {new Date(order.orderDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Payment:</span> {order.paymentMethod} ({order.paymentStatus})
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FiDollarSign className="text-pink-600" />
                    <span className="font-bold text-xl">₹{order.totalAmount}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.productName}</h4>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border-2 border-purple-200">
              <p className="text-center text-gray-700">
                <span className="font-semibold">Need help?</span> Contact us for any queries about your order.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
