import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiMenu, FiX, FiLogOut, FiImage, FiTag, FiGrid, FiCpu, FiSmartphone, FiTablet, FiTrendingUp, FiUsers } from 'react-icons/fi';
import Products from '../components/Products';
import Orders from '../components/Orders';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('all-products');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = [
    { id: 'posters', label: 'Posters', icon: FiImage, color: 'from-pink-500 to-rose-500', bgCard: 'bg-gradient-to-br from-pink-50 to-rose-50', border: 'border-pink-200', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
    { id: 'stickers', label: 'Stickers', icon: FiTag, color: 'from-purple-500 to-violet-500', bgCard: 'bg-gradient-to-br from-purple-50 to-violet-50', border: 'border-purple-200', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { id: 'desk-mat', label: 'Desk Mats', icon: FiGrid, color: 'from-blue-500 to-cyan-500', bgCard: 'bg-gradient-to-br from-blue-50 to-cyan-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { id: 'calculator', label: 'Calculators', icon: FiCpu, color: 'from-green-500 to-emerald-500', bgCard: 'bg-gradient-to-br from-green-50 to-emerald-50', border: 'border-green-200', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { id: 'skins', label: 'Skins', icon: FiSmartphone, color: 'from-orange-500 to-amber-500', bgCard: 'bg-gradient-to-br from-orange-50 to-amber-50', border: 'border-orange-200', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { id: 'covers', label: 'Covers', icon: FiTablet, color: 'from-indigo-500 to-purple-500', bgCard: 'bg-gradient-to-br from-indigo-50 to-purple-50', border: 'border-indigo-200', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  ];

  const menuItems = [
    { id: 'all-products', label: 'All Products', icon: FiPackage, category: null, gradient: 'from-violet-500 to-purple-500' },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag, category: null, gradient: 'from-blue-500 to-cyan-500' },
  ];

  const renderContent = () => {
    if (activeTab === 'orders') {
      return <Orders />;
    }
    
    const category = categories.find(cat => cat.id === activeTab);
    if (category) {
      return <Products filterCategory={category.id} categoryName={category.label} />;
    }
    
    return <Products filterCategory={null} categoryName="All Products" />;
  };

  const getActiveCategory = () => {
    if (activeTab === 'orders') return { label: 'Order Management', icon: FiShoppingBag };
    if (activeTab === 'all-products') return { label: 'All Products', icon: FiPackage };
    const cat = categories.find(c => c.id === activeTab);
    return cat ? { label: cat.label, icon: cat.icon } : { label: 'Dashboard', icon: FiTrendingUp };
  };

  const activeCat = getActiveCategory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-600"
              >
                {sidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl p-2.5 shadow-lg">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Famezy Admin
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Management Portal</p>
                </div>
              </div>
            </div>

            {/* User Profile & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl border border-violet-100">
                <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                  A
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-sm"
              >
                <FiLogOut className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out overflow-y-auto shadow-xl lg:shadow-none`}
        >
          <div className="p-6 space-y-8">
            {/* Main Menu */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-1 rounded-full bg-violet-500"></div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Main Menu
                </h3>
              </div>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                      activeTab === item.id
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-purple-500/30 scale-105`
                        : 'text-gray-700 hover:bg-gray-50 hover:scale-102'
                    }`}
                  >
                    <item.icon className="text-xl flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-1 rounded-full bg-violet-500"></div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Product Categories
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveTab(cat.id);
                      setSidebarOpen(false);
                    }}
                    className={`relative group flex flex-col items-center gap-2.5 p-4 rounded-xl transition-all duration-300 border ${
                      activeTab === cat.id
                        ? `${cat.bgCard} ${cat.border} shadow-lg transform scale-105 border-2`
                        : 'bg-white border-gray-200 hover:shadow-md hover:scale-102'
                    }`}
                  >
                    <div className={`w-11 h-11 ${activeTab === cat.id ? cat.iconBg : 'bg-gray-100 group-hover:' + cat.iconBg} rounded-xl flex items-center justify-center transition-colors`}>
                      <cat.icon className={`text-xl ${activeTab === cat.id ? cat.iconColor : 'text-gray-600 group-hover:' + cat.iconColor} transition-colors`} />
                    </div>
                    <span className={`text-xs font-bold text-center ${activeTab === cat.id ? cat.iconColor : 'text-gray-700'}`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
                <activeCat.icon className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {activeCat.label}
                </h2>
                <p className="text-gray-600 text-sm mt-0.5">
                  {activeTab === 'orders'
                    ? 'View and manage all customer orders'
                    : `Manage your ${activeTab === 'all-products' ? 'entire' : activeCat.label.toLowerCase()} product inventory`}
                </p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Dashboard;
