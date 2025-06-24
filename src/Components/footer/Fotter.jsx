import img1 from "./asset/qr-barcode-for-data-labeling-1257966228-0dcfa9a3fbad4721aa5717bf13953adf.jpg";
import img2 from "./asset/preview_d605be53ac335ec29de57d357cb82436.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faEnvelope, faPhone, faMapMarkerAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Fotter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Exclusive Section */}
          <div className="lg:col-span-1">
            <h4 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Exclusive
            </h4>
            <p className="text-lg font-medium mb-3">Subscribe</p>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Get 10% off your first order
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 pr-12 text-sm bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-200"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary-400 hover:text-primary-300 transition-all duration-200 hover:scale-110">
                <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
              Support
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
                </p>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-sm text-gray-300">exclusive@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-primary-400" />
                </div>
                <p className="text-sm text-gray-300">+88015-88888-9999</p>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
              Account
            </h4>
            <div className="space-y-3">
              <Link
                to="/mange-account"
                className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
              >
                <span className="flex items-center">
                  My Account
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </span>
              </Link>
              <Link
                to="/login"
                className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
              >
                <span className="flex items-center">
                  Login / Register
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </span>
              </Link>
              <Link
                to="/cart"
                className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
              >
                <span className="flex items-center">
                  Cart
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </span>
              </Link>
              <Link
                to="/wishlist"
                className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
              >
                <span className="flex items-center">
                  Wishlist
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </span>
              </Link>
              <Link
                to="/shop"
                className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
              >
                <span className="flex items-center">
                  Shop
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Link Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
              Quick Link
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-300 cursor-pointer hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5">
                Privacy Policy
              </p>
              <p className="text-sm text-gray-300 cursor-pointer hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5">
                Terms Of Use
              </p>
              <p className="text-sm text-gray-300 cursor-pointer hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5">
                FAQ
              </p>
              <Link
                to="/contact"
                className="block text-sm text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/5 group"
              >
                <span className="flex items-center">
                  Contact
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </span>
              </Link>
            </div>
          </div>

          {/* Download App Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
              Download App
            </h4>
            <p className="text-xs text-gray-300 mb-6 leading-relaxed">
              Save $3 with App New User Only
            </p>
            <div className="space-y-4">
              <img 
                src={img1} 
                alt="Google Play Store" 
                className="h-12 cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-105" 
              />
              <img 
                src={img2} 
                alt="App Store" 
                className="h-12 cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-center sm:text-left text-sm text-gray-400 mb-4 sm:mb-0">
              &copy; Copyright Rimet {new Date().getFullYear()} All right reserved
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-xs text-gray-500">Made with ❤️ for you</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
