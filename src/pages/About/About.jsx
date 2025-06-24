import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronRight, faStar, faUsers, faShoppingBag, faGlobe, faAward } from "@fortawesome/free-solid-svg-icons";
import img1 from "./Images/7b85f8c1dcce81e71e2eb178be13bd4d.jpg";

export default function About() {
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
          <span className="font-semibold text-gray-900">About</span>
        </nav>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Story</span>
              </h1>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
                </p>
                <p>
                  Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion and lifestyle.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <FontAwesomeIcon icon={faUsers} className="w-8 h-8 text-primary-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900">3M+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <FontAwesomeIcon icon={faShoppingBag} className="w-8 h-8 text-secondary-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900">1M+</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <FontAwesomeIcon icon={faGlobe} className="w-8 h-8 text-primary-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900">10.5K</div>
                <div className="text-sm text-gray-600">Sellers</div>
              </div>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <FontAwesomeIcon icon={faAward} className="w-8 h-8 text-secondary-600 mb-3" />
                <div className="text-2xl font-bold text-gray-900">300</div>
                <div className="text-sm text-gray-600">Brands</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-soft">
                <img 
                  src={img1} 
                  alt="Our Story" 
                  className="w-full h-auto rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-large">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">4.9</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Customer Rating</p>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl p-4 shadow-large">
              <div className="text-2xl font-bold">8+</div>
              <p className="text-xs opacity-90">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faStar} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assured</h3>
            <p className="text-gray-600 leading-relaxed">
              Every product in our marketplace undergoes rigorous quality checks to ensure you receive only the best.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faGlobe} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Global Reach</h3>
            <p className="text-gray-600 leading-relaxed">
              Serving millions of customers across South Asia with a network of trusted sellers and brands.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faUsers} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer First</h3>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to exceptional customer service and satisfaction drives everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
