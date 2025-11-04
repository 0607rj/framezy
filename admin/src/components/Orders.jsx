import { useState, useEffect } from 'react';
import { FiPackage, FiSearch, FiUser, FiMapPin, FiMail, FiPhone, FiCalendar, FiDollarSign } from 'react-icons/fi';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
      const data = await response.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (response.ok) {
        fetchOrders();
        alert('✅ Order status updated!');
      }
    } catch (error) {
      console.error('Error updating order:', error);
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

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 relative">
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-32 bg-purple-50 rounded-3xl border-2 border-dashed border-purple-200">
          <FiPackage className="mx-auto text-6xl text-purple-300 mb-4" />
          <p className="text-gray-600 text-xl font-semibold">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-xl p-3">
                    <FiPackage className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{order.customerName}</h3>
                    <p className="text-white/80 text-sm">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl border-2 font-semibold ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm uppercase mb-4">Customer</h4>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 rounded-lg p-2"><FiUser className="text-purple-600" /></div>
                    <div><p className="text-xs text-gray-500">Name</p><p className="font-semibold">{order.customerName}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-lg p-2"><FiMail className="text-blue-600" /></div>
                    <div><p className="text-xs text-gray-500">Email</p><p className="font-semibold text-sm">{order.email}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-lg p-2"><FiPhone className="text-green-600" /></div>
                    <div><p className="text-xs text-gray-500">Phone</p><p className="font-semibold">{order.phone}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-lg p-2 mt-1"><FiMapPin className="text-orange-600" /></div>
                    <div>
                      <p className="text-xs text-gray-500">Delivery Address</p>
                      <p className="font-semibold text-sm leading-relaxed">
                        {order.address}<br />
                        {order.city}, {order.state} - {order.pincode}
                      </p>
                    </div>
                  </div>
                  {order.notes && (
                    <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-xl border border-blue-200">
                      <div className="bg-blue-100 rounded-lg p-2 mt-1"><FiPackage className="text-blue-600" /></div>
                      <div>
                        <p className="text-xs text-blue-600 font-bold">Delivery Notes</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{order.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm uppercase mb-4">Order Info</h4>
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 rounded-lg p-2"><FiPackage className="text-pink-600" /></div>
                    <div><p className="text-xs text-gray-500">Items</p><p className="font-semibold">{order.items?.length || 0} Products</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-lg p-2"><FiDollarSign className="text-green-600" /></div>
                    <div><p className="text-xs text-gray-500">Total</p><p className="font-bold text-2xl">₹{order.totalAmount}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 rounded-lg p-2"><FiCalendar className="text-indigo-600" /></div>
                    <div><p className="text-xs text-gray-500">Date</p><p className="font-semibold">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p></div>
                  </div>
                  <div className="pt-4">
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Update Status</label>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none font-semibold cursor-pointer"
                    >
                      <option value="Pending">📦 Pending</option>
                      <option value="Processing">⚙️ Processing</option>
                      <option value="Shipped">🚚 Shipped</option>
                      <option value="Delivered">✅ Delivered</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="px-6 pb-6 pt-0">
                  <div className="pt-6 border-t-2 border-gray-100">
                    <h4 className="font-bold text-gray-900 text-sm uppercase mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 rounded-xl border-2 border-purple-100">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md"
                            />
                          )}
                          <div className="flex-1">
                            <h5 className="font-bold text-gray-900">{item.productName || `Item ${idx + 1}`}</h5>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600">Qty: <span className="font-bold text-purple-600">{item.quantity}</span></span>
                              <span className="text-sm text-gray-600">Price: <span className="font-bold text-purple-600">₹{item.price}</span></span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Subtotal</p>
                            <p className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;