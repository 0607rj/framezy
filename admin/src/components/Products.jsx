import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiPackage, FiStar } from 'react-icons/fi';

function Products({ filterCategory = null, categoryName = 'All Products' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: filterCategory || '',
    subcategory: '',
    image: '',
    stock: '',
    rating: 0,
    featured: false
  });

  // Subcategory mapping based on category
  const subcategoryOptions = {
    posters: ['Colors', 'Splits', 'Single', 'Collage Kit', 'Vision Board', 'Polaroids'],
    stickers: ['Mobile', 'Laptop', 'Camera'],
    'desk-mat': ['90×40', '85×35'],
    calculator: ['100 ms', '991 ms'],
    skins: ['Phone Skins', 'Laptop Skins', 'Tablet Skins'],
    covers: ['Diary', 'Note', 'Custom']
  };

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [filterCategory]);

  const fetchProducts = async () => {
    try {
      const url = filterCategory 
        ? `${import.meta.env.VITE_API_URL}/products?category=${filterCategory}`
        : `${import.meta.env.VITE_API_URL}/products`;
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add/Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert string values to proper types
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating)
      };

      const url = editingProduct
        ? `${import.meta.env.VITE_API_URL}/products/${editingProduct._id}`
        : `${import.meta.env.VITE_API_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        fetchProducts();
        closeModal();
        alert(editingProduct ? 'Product updated!' : 'Product added!');
      } else {
        const errorData = await response.json();
        console.error('Backend error:', errorData);
        alert(`Failed to save product: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
        alert('Product deleted!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: filterCategory || '',
        subcategory: '',
        image: '',
        stock: '',
        rating: 0,
        featured: false
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-violet-500 transition-colors" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-violet-100 focus:border-violet-500 transition-all outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-7 py-3.5 rounded-xl font-bold hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 transform"
        >
          <FiPlus className="text-xl" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-violet-200 border-t-violet-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-32">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full mb-6">
            <FiPackage className="text-5xl text-violet-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No {filterCategory ? categoryName : ''} products found</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first product</p>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FiPlus />
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="relative h-56 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 overflow-hidden">
                <img
                  src={product.image || 'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Product'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {product.featured && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1">
                    ⭐ Featured
                  </span>
                )}
                <span className={`absolute top-3 right-3 ${product.stock > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'} text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg`}>
                  {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of Stock'}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 bg-violet-50 text-violet-700 text-xs font-bold rounded-lg border border-violet-200">
                    {product.category}
                  </span>
                  <span className="px-2.5 py-1 bg-fuchsia-50 text-fuchsia-700 text-xs font-semibold rounded-lg border border-fuchsia-200">
                    {product.subcategory}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-bold text-amber-500">★</span>
                      <span className="text-lg font-bold text-gray-800">{product.rating || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    <FiEdit2 className="text-lg" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                  >
                    <FiTrash2 className="text-lg" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-6 flex items-center justify-between rounded-t-3xl z-10 shadow-lg">
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <p className="text-violet-100 text-sm">
                  {editingProduct ? 'Update product information' : 'Fill in the details to create a new product'}
                </p>
              </div>
              <button onClick={closeModal} className="hover:bg-white/20 p-2.5 rounded-xl transition-colors">
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="posters">Posters</option>
                    <option value="stickers">Skin Stickers</option>
                    <option value="desk-mat">Desk Mat</option>
                    <option value="calculator">Calculator</option>
                    <option value="skins">Skins</option>
                    <option value="covers">Covers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory *</label>
                  <select
                    required
                    value={formData.subcategory}
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                    disabled={!formData.category}
                  >
                    <option value="">Select subcategory</option>
                    {formData.category && subcategoryOptions[formData.category]?.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  {!formData.category && (
                    <p className="text-xs text-gray-500 mt-1">Please select a category first</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0-5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                  placeholder="Product description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
                  Mark as Featured Product
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
