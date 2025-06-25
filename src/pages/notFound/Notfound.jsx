import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faChevronRight, 
  faExclamationTriangle, 
  faArrowLeft,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

export default function Notfound() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 min-h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <a href="/" className="flex items-center hover:text-primary-600 transition-colors duration-200">
            <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-1" />
            Home
          </a>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <span className="font-semibold text-gray-900">404 Error</span>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center py-10 sm:py-20 text-center">
          {/* 404 Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-large mb-6">
              <FontAwesomeIcon icon={faExclamationTriangle} className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-xs font-bold text-white">!</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">404</span>
            </h1>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link 
              to="/home" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
            >
              <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faSearch} className="text-primary-600 w-5 h-5" />
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-4">
              Try searching for products or browse our categories to find what you need.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white font-medium rounded-xl hover:from-secondary-700 hover:to-secondary-800 transition-all duration-200 shadow-soft hover:shadow-medium"
            >
              Browse Shop
            </Link>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faSearch} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Search Products</h3>
            <p className="text-gray-600 leading-relaxed">
              Use our search feature to find specific products or browse through our categories.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faHome} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Homepage</h3>
            <p className="text-gray-600 leading-relaxed">
              Return to our homepage to explore featured products and latest offers.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faExclamationTriangle} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Report Issue</h3>
            <p className="text-gray-600 leading-relaxed">
              If you believe this is an error, please contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
