import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 lg:mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Famezy</h3>
                <p className="text-xs text-gray-400">Frames That Inspire</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm lg:text-base leading-relaxed">
              Premium stickers, posters, and accessories to express your unique style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-indigo-400 transition text-sm lg:text-base">Home</a></li>
              <li><a href="#categories" className="hover:text-indigo-400 transition text-sm lg:text-base">Categories</a></li>
              <li><a href="#products" className="hover:text-indigo-400 transition text-sm lg:text-base">Products</a></li>
              <li><a href="#about" className="hover:text-indigo-400 transition text-sm lg:text-base">About Us</a></li>
              <li><a href="#contact" className="hover:text-indigo-400 transition text-sm lg:text-base">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-indigo-400 transition text-sm lg:text-base">Posters</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition text-sm lg:text-base">Skin Stickers</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition text-sm lg:text-base">Desk Mats</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition text-sm lg:text-base">Calculator Skins</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition text-sm lg:text-base">Custom Designs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact">
            <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm lg:text-base">+91 98765 43210</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm lg:text-base break-all">hello@famezy.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm lg:text-base">123 Business Street<br />Mumbai, Maharashtra 400001</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-sm text-center lg:text-left">© 2025 Famezy. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
