import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

function CategoryPage() {
  const { categoryName } = useParams();

  const categoryData = {
    posters: {
      name: 'Posters',
      description: 'Premium wall art and decoration',
      icon: '🖼️',
      bgColor: 'from-pink-500 to-rose-500',
      subcategories: [
        { name: 'Colors', size: 'All sizes', image: 'https://placehold.co/400x400/ec4899/ffffff?text=Colors' },
        { name: 'Splits', size: '2×2, 4×2', image: 'https://placehold.co/400x400/f472b6/ffffff?text=Splits' },
        { name: 'Single', size: 'Standard', image: 'https://placehold.co/400x400/fb7185/ffffff?text=Single' },
        { name: 'Collage Kit', size: '16×16', image: 'https://placehold.co/400x400/fda4af/ffffff?text=Collage' },
        { name: 'Vision Board', size: 'Custom', image: 'https://placehold.co/400x400/fecdd3/ffffff?text=Vision' },
        { name: 'Polaroids', size: 'Small', image: 'https://placehold.co/400x400/ffe4e6/ffffff?text=Polaroids' }
      ]
    },
    stickers: {
      name: 'Skin Stickers',
      description: 'Premium device skins & stickers',
      icon: '📱',
      bgColor: 'from-purple-500 to-violet-500',
      subcategories: [
        { name: 'Mobile', size: 'All models', image: 'https://placehold.co/400x400/8b5cf6/ffffff?text=Mobile' },
        { name: 'Laptop', size: '13", 15", 17"', image: 'https://placehold.co/400x400/a78bfa/ffffff?text=Laptop' },
        { name: 'Camera', size: 'DSLR', image: 'https://placehold.co/400x400/c4b5fd/ffffff?text=Camera' }
      ]
    },
    'desk-mat': {
      name: 'Desk Mat',
      description: 'Large gaming and office mats',
      icon: '🖥️',
      bgColor: 'from-indigo-500 to-blue-500',
      subcategories: [
        { name: '90×40', size: 'cm', image: 'https://placehold.co/400x400/6366f1/ffffff?text=90x40' },
        { name: '85×35', size: 'cm', image: 'https://placehold.co/400x400/818cf8/ffffff?text=85x35' }
      ]
    },
    calculator: {
      name: 'Calculator',
      description: 'Calculator skins & covers',
      icon: '🔢',
      bgColor: 'from-cyan-500 to-teal-500',
      subcategories: [
        { name: '100 ms', size: 'Standard', image: 'https://placehold.co/400x400/14b8a6/ffffff?text=100ms' },
        { name: '991 ms', size: 'Scientific', image: 'https://placehold.co/400x400/2dd4bf/ffffff?text=991ms' }
      ]
    },
    skins: {
      name: 'Skins',
      description: 'Custom device skins',
      icon: '🎨',
      bgColor: 'from-orange-500 to-amber-500',
      subcategories: [
        { name: 'Phone Skins', size: 'All models', image: 'https://placehold.co/400x400/f97316/ffffff?text=Phone' },
        { name: 'Laptop Skins', size: 'Custom', image: 'https://placehold.co/400x400/fb923c/ffffff?text=Laptop' },
        { name: 'Tablet Skins', size: 'All sizes', image: 'https://placehold.co/400x400/fdba74/ffffff?text=Tablet' }
      ]
    },
    covers: {
      name: 'Covers',
      description: 'Protective covers',
      icon: '📔',
      bgColor: 'from-emerald-500 to-green-500',
      subcategories: [
        { name: 'Diary', size: 'A5, A4', image: 'https://placehold.co/400x400/10b981/ffffff?text=Diary' },
        { name: 'Note', size: 'Pocket', image: 'https://placehold.co/400x400/34d399/ffffff?text=Note' },
        { name: 'Custom', size: 'Any size', image: 'https://placehold.co/400x400/6ee7b7/ffffff?text=Custom' }
      ]
    }
  };

  const category = categoryData[categoryName];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
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
      <div className={`bg-gradient-to-r ${category.bgColor} text-white py-20 lg:py-32`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors duration-300 group"
          >
            <FiArrowLeft className="text-xl group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="text-7xl lg:text-8xl animate-bounce-slow">{category.icon}</div>
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">{category.name}</h1>
              <p className="text-lg lg:text-xl text-white/90">{category.description}</p>
            </div>
          </div>
          
          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="text-white/90 text-sm mb-2">Available Options</p>
            <p className="text-3xl font-bold">{category.subcategories.length} Products</p>
          </div>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {category.subcategories.map((sub, index) => (
            <Link
              key={index}
              to={`/category/${categoryName}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-slideUp border-2 border-gray-100 hover:border-purple-300 block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <p className={`text-sm font-bold bg-gradient-to-r ${category.bgColor} bg-clip-text text-transparent`}>
                    {sub.size}
                  </p>
                </div>
              </div>
              
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{sub.name}</h3>
                <p className="text-gray-600 mb-6">Premium quality {sub.name.toLowerCase()} for your needs</p>
                
                <div className={`w-full bg-gradient-to-r ${category.bgColor} text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-center`}>
                  <span>View Products</span>
                  <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
