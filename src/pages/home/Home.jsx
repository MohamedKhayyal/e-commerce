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
import Product from "../../Components/Product";
import Product1 from "../../Components/Product1";
import Product2 from "../../Components/Product2";
import Slider from "../../Components/Slider";
import FeatureCard from "../../Components/FeatureCard";
import NewArrival from "../../Components/NewArrival";

export default function Home() {
  const [selectId, setSelectId] = useState(null);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  const category = [
    {
      icon: <FontAwesomeIcon icon={faMobileScreen} />,
      name: "Phones",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop} />,
      name: "Computers",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FontAwesomeIcon icon={faStopwatch} />,
      name: "SmartWatch",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FontAwesomeIcon icon={faCamera} />,
      name: "Camera",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <FontAwesomeIcon icon={faHeadphones} />,
      name: "HeadPhones",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FontAwesomeIcon icon={faGamepad} />,
      name: "Gaming",
      color: "from-orange-500 to-orange-600",
    },
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
    "Health & Beauty",
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
            <div
              className={`lg:col-span-1 transition-all duration-300 ${
                isQuickLinksOpen ? "block" : "hidden lg:block"
              }`}
            >
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
            <div className="lg:col-span-3 overflow-x-hidden">
              <Slider />
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <Product />
      {/* Categories Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-medium text-primary-600 mb-1 sm:mb-2 md:mb-3">
              Categories
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6">
              Browse By Category
            </h2>
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {category.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectId(index)}
                className={`group relative p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectId === index
                    ? "border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 shadow-lg"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-25 hover:to-primary-50"
                }`}
              >
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-3 lg:mb-4 transition-all duration-300 ${
                    selectId === index
                      ? "text-primary-600"
                      : `text-gray-400 group-hover:text-primary-600`
                  }`}
                >
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
      <NewArrival />
      {/* Features Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <FeatureCard
              icon={faTruck}
              title="FREE AND FAST DELIVERY"
              description="Free delivery for all orders over $140"
              iconClass="w-8 h-8 sm:w-10 sm:h-10 text-primary-600"
              bgClass="bg-gradient-to-br from-primary-100 to-primary-200"
            />
            <FeatureCard
              icon={faHeadset}
              title="24/7 CUSTOMER SERVICE"
              description="Friendly 24/7 customer support"
              iconClass="w-8 h-8 sm:w-10 sm:h-10 text-secondary-600"
              bgClass="bg-gradient-to-br from-secondary-100 to-secondary-200"
            />
            <FeatureCard
              icon={faCheck}
              title="MONEY BACK GUARANTEE"
              description="We return money within 30 days"
              iconClass="w-8 h-8 sm:w-10 sm:h-10 text-accent-600"
              bgClass="bg-gradient-to-br from-accent-100 to-accent-200"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
