import { FiAward, FiHeart, FiTruck, FiShield } from 'react-icons/fi';

function About() {
  const features = [
    {
      icon: <FiAward className="w-12 h-12" />,
      title: 'Premium Quality',
      description: 'High-quality materials and printing for vibrant, long-lasting designs',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <FiHeart className="w-12 h-12" />,
      title: 'Made with Love',
      description: 'Each design is carefully crafted with attention to detail and creativity',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: <FiTruck className="w-12 h-12" />,
      title: 'Fast Delivery',
      description: 'Quick and secure shipping to bring your products to your doorstep',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <FiShield className="w-12 h-12" />,
      title: 'Secure Payments',
      description: 'Safe and encrypted payment methods for worry-free shopping',
      color: 'from-cyan-500 to-teal-500'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 animate-slideUp">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">Famezy</span>
          </h2>
          <p className="text-gray-600 text-base lg:text-xl max-w-3xl mx-auto leading-relaxed">
            We're a passionate startup dedicated to bringing creative and unique designs to your everyday items. 
            From posters that inspire to stickers that personalize, we're here to help you express yourself.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32">
          <div className="animate-slideInLeft">
            <div className="bg-gradient-to-br from-pink-200 to-purple-300 rounded-3xl aspect-square overflow-hidden shadow-2xl">
              <img 
                src="https://placehold.co/600x600/ec4899/ffffff?text=Our+Story" 
                alt="About Famezy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="space-y-6 animate-slideInRight">
            <h3 className="text-2xl lg:text-4xl font-bold text-gray-900">Our Story</h3>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              Famezy started with a simple idea: to make personalization accessible and affordable for everyone. 
              As a new startup, we're building a community of creative individuals who want to stand out.
            </p>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              Every product we create is designed with passion and attention to detail. We believe that the 
              things you surround yourself with should reflect your unique personality and inspire you every day.
            </p>
            <div className="pt-4">
              <div className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-3 rounded-xl border-2 border-pink-200">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-bold">
                  🚀 Launched in 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl lg:rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-slideUp border-2 border-gray-100 hover:border-purple-200"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
