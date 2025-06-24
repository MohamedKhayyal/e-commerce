import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreen,
  faGamepad,
  faDesktop,
  faStopwatch,
  faCamera,
  faHeadphones,
  faTruck,
  faCheck,
  faHeadset,
  faArrowRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import img3 from "./0c1817d3afa266b3c9f8c81ff0ed4428.png";
import img4 from "./08463f7e8f57dd3048a2444dbfa0cb90.jpeg";
import img5 from "./2977438364a41d7e8c9d1e9a794d43ed.png";
import img6 from "./5102562cf220504d288fa568eaa816dd.png";
import Product from "./Product";
import Product1 from "./Product1";
import Product2 from "./Product2";
import Slider from "./Slider";

export default function Home() {
  const [selectId, setSelectId] = useState(null);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  
  const category = [
    { icon: <FontAwesomeIcon icon={faMobileScreen} />, name: "Phones", color: "from-blue-500 to-blue-600" },
    { icon: <FontAwesomeIcon icon={faDesktop} />, name: "Computers", color: "from-purple-500 to-purple-600" },
    { icon: <FontAwesomeIcon icon={faStopwatch} />, name: "SmartWatch", color: "from-green-500 to-green-600" },
    { icon: <FontAwesomeIcon icon={faCamera} />, name: "Camera", color: "from-red-500 to-red-600" },
    { icon: <FontAwesomeIcon icon={faHeadphones} />, name: "HeadPhones", color: "from-pink-500 to-pink-600" },
    { icon: <FontAwesomeIcon icon={faGamepad} />, name: "Gaming", color: "from-orange-500 to-orange-600" },
  ];

  const quickLinks = [
    "Woman's Fashion",
    "Men's Fashion", 
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 xl:py-12">
          {/* Mobile Quick Links Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
              className="flex items-center px-4 py-2 bg-white rounded-xl shadow-soft border border-gray-100 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
            >
              <FontAwesomeIcon 
                icon={isQuickLinksOpen ? faTimes : faBars} 
                className="w-4 h-4 mr-2" 
              />
              Quick Links
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Quick Links Sidebar */}
            <div className={`lg:col-span-1 transition-all duration-300 ${
              isQuickLinksOpen ? 'block' : 'hidden lg:block'
            }`}>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Quick Links
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to="/shop"
                      onClick={() => setIsQuickLinksOpen(false)}
                      className="block text-xs sm:text-sm text-gray-600 hover:text-primary-600 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-primary-50 group"
                    >
                      <span className="flex items-center justify-between">
                        <span className="truncate">{link}</span>
                        {index < 2 && (
                          <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className="w-3 h-3 text-gray-400 group-hover:text-primary-600 transition-colors flex-shrink-0 ml-2" 
                          />
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Slider */}
            <div className="lg:col-span-3">
              <Slider />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <Product />

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p className="text-sm font-medium text-primary-600 mb-2 sm:mb-3">Categories</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Browse By Category
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {category.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectId(index)}
                className={`group relative p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectId === index
                    ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 shadow-lg'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-25 hover:to-primary-50'
                }`}
              >
                <div className={`text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3 lg:mb-4 transition-all duration-300 ${
                  selectId === index 
                    ? 'text-primary-600' 
                    : `text-gray-400 group-hover:text-primary-600`
                }`}>
                  {item.icon}
                </div>
                <p className="text-xs sm:text-sm font-medium">{item.name}</p>
                {selectId === index && (
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full animate-ping"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* More Products */}
      <Product1 />
      <Product2 />

      {/* New Arrival Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p className="text-sm font-medium text-primary-600 mb-2 sm:mb-3">Featured</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              New Arrival
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Main Product */}
            <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
              <img 
                src={img3} 
                alt="PlayStation 5" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">PlayStation 5</h3>
                <p className="text-gray-200 mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <Link 
                  to="/shop" 
                  className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-gray-900 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                >
                  Shop Now
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side Products */}
            <div className="space-y-6 sm:space-y-8">
              <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
                <img 
                  src={img4} 
                  alt="Women's Collections" 
                  className="w-full h-48 sm:h-56 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Women's Collections</h3>
                  <p className="text-gray-200 mb-3 sm:mb-4 text-xs sm:text-sm">
                    Featured woman collections that give you another vibe.
                  </p>
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-gray-900 text-xs sm:text-sm font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                  >
                    Shop Now
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1 sm:ml-2 w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
                  <img 
                    src={img5} 
                    alt="Speakers" 
                    className="w-full h-24 sm:h-28 lg:h-40 object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                    <h3 className="text-sm sm:text-lg font-bold mb-1">Speakers</h3>
                    <p className="text-gray-200 text-xs mb-2">Amazon wireless speakers</p>
                    <Link 
                      to="/shop" 
                      className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-white text-gray-900 text-xs font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                    >
                      Shop Now
                      <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
                  <img 
                    src={img6} 
                    alt="Perfume" 
                    className="w-full h-24 sm:h-28 lg:h-40 object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                    <h3 className="text-sm sm:text-lg font-bold mb-1">Perfume</h3>
                    <p className="text-gray-200 text-xs mb-2">GUCCI INTENSE OUD EDP</p>
                    <Link 
                      to="/shop" 
                      className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-white text-gray-900 text-xs font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                    >
                      Shop Now
                      <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faTruck} className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                FREE AND FAST DELIVERY
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Free delivery for all orders over $140
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faHeadset} className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                24/7 CUSTOMER SERVICE
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Friendly 24/7 customer support
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faCheck} className="w-8 h-8 sm:w-10 sm:h-10 text-accent-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                MONEY BACK GUARANTEE
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We return money within 30 days
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
