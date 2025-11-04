import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

function Contact() {
  const contactInfo = [
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      info: '+91 00000 00000',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      info: 'hello@famezy.com',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Address',
      info: 'City, State, India',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{animationDelay: '3s'}}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 animate-slideUp">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">Touch</span>
          </h2>
          <p className="text-gray-600 text-base lg:text-xl max-w-2xl mx-auto">
            Have questions or need help? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="animate-slideInLeft">
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 lg:p-10 shadow-xl border-2 border-purple-100">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us what you need..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10">Send Message</span>
                  <FiSend className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-slideInRight space-y-8">
            <div className="bg-gradient-to-br from-pink-200 to-purple-300 rounded-3xl aspect-square overflow-hidden shadow-2xl mb-8">
              <img 
                src="https://placehold.co/600x600/8b5cf6/ffffff?text=Contact+Us" 
                alt="Contact Famezy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 flex items-start gap-4 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 border-2 border-pink-200">
              <h4 className="font-bold text-gray-900 mb-2">Business Hours</h4>
              <p className="text-gray-600 text-sm">Monday - Saturday: 10:00 AM - 7:00 PM</p>
              <p className="text-gray-600 text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
