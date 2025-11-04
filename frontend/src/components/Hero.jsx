import { FiArrowRight } from 'react-icons/fi';

function Hero() {
  return (
    <section id="home" className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 animate-fadeIn text-center lg:text-left lg:pr-8">
            <div className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 text-transparent bg-clip-text px-5 py-2 rounded-full text-sm font-bold animate-slideDown mx-auto lg:mx-0 border-2 border-pink-200 shadow-lg animate-pulse-slow">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">✨ New Collection 2025 ✨</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight animate-slideUp">
              Frames That <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 animate-gradient">Inspire</span>
            </h1>
            
            <p className="text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed animate-slideUp mx-auto lg:mx-0" style={{animationDelay: '0.1s'}}>
              Premium quality stickers, posters, desk mats, and calculator skins.
              Transform your workspace with designs that reflect your personality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slideUp" style={{animationDelay: '0.2s'}}>
              <button className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden">
                <span className="relative z-10">Shop Now</span>
                <FiArrowRight className="text-xl relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:text-white hover:border-transparent hover:scale-110 transition-all duration-300 shadow-md hover:shadow-xl">
                Browse Collection
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-8 lg:pt-12 border-t border-gray-200 animate-slideUp mx-auto lg:mx-0" style={{animationDelay: '0.3s'}}>
              <div className="text-center">
                <div className="text-xl lg:text-3xl xl:text-4xl font-bold text-gray-900">50+</div>
                <div className="text-xs lg:text-sm xl:text-base text-gray-600 mt-1">Designs</div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-3xl xl:text-4xl font-bold text-gray-900">100+</div>
                <div className="text-xs lg:text-sm xl:text-base text-gray-600 mt-1">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-3xl xl:text-4xl font-bold text-gray-900">4.8★</div>
                <div className="text-xs lg:text-sm xl:text-base text-gray-600 mt-1">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid with Placeholders */}
          <div className="grid grid-cols-2 gap-4 animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <div className="bg-gradient-to-br from-pink-200 to-purple-300 rounded-2xl lg:rounded-3xl aspect-square overflow-hidden group hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-xl hover:shadow-2xl animate-float cursor-pointer relative" style={{animationDelay: '0s'}}>
              <img 
                src="https://placehold.co/400x400/ec4899/ffffff?text=Posters" 
                alt="Posters Collection" 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="bg-gradient-to-br from-purple-200 to-indigo-300 rounded-2xl lg:rounded-3xl aspect-square overflow-hidden group hover:scale-110 hover:-rotate-6 transition-all duration-500 shadow-xl hover:shadow-2xl animate-float cursor-pointer relative" style={{animationDelay: '0.2s'}}>
              <img 
                src="https://placehold.co/400x400/8b5cf6/ffffff?text=Stickers" 
                alt="Skin Stickers Collection" 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="bg-gradient-to-br from-indigo-200 to-blue-300 rounded-2xl lg:rounded-3xl aspect-square overflow-hidden group hover:scale-110 hover:-rotate-6 transition-all duration-500 shadow-xl hover:shadow-2xl animate-float cursor-pointer relative" style={{animationDelay: '0.4s'}}>
              <img 
                src="https://placehold.co/400x400/6366f1/ffffff?text=Desk+Mats" 
                alt="Desk Mats Collection" 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="bg-gradient-to-br from-blue-200 to-cyan-300 rounded-2xl lg:rounded-3xl aspect-square overflow-hidden group hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-xl hover:shadow-2xl animate-float cursor-pointer relative" style={{animationDelay: '0.6s'}}>
              <img 
                src="https://placehold.co/400x400/3b82f6/ffffff?text=Calculator" 
                alt="Calculator Skins Collection" 
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
