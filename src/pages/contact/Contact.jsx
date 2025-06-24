import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPhone, 
  faEnvelope, 
  faHome, 
  faChevronRight, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faUser,
  faMessage
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
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
          <span className="font-semibold text-gray-900">Contact</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              {/* Phone Section */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Call To Us</h3>
                    <p className="text-gray-600">We are available 24/7, 7 days a week.</p>
                  </div>
                </div>
                <div className="ml-16">
                  <p className="text-lg font-semibold text-primary-600">+8801611112222</p>
                </div>
              </div>

              {/* Email Section */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Write To Us</h3>
                    <p className="text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
                  </div>
                </div>
                <div className="ml-16 space-y-2">
                  <p className="text-lg font-semibold text-secondary-600">customer@exclusive.com</p>
                  <p className="text-lg font-semibold text-secondary-600">support@exclusive.com</p>
                </div>
              </div>

              {/* Address Section */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">Our office location</p>
                  </div>
                </div>
                <div className="ml-16">
                  <p className="text-lg font-semibold text-gray-700">Dhaka, Bangladesh</p>
                </div>
              </div>

              {/* Hours Section */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faClock} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">When we're available</p>
                  </div>
                </div>
                <div className="ml-16">
                  <p className="text-lg font-semibold text-gray-700">24/7 Support</p>
                  <p className="text-gray-600">Monday - Sunday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2 text-primary-600" />
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2 text-primary-600" />
                    Your Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2 text-primary-600" />
                  Your Phone
                </label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faMessage} className="w-4 h-4 mr-2 text-primary-600" />
                  Your Message
                </label>
                <textarea 
                  placeholder="Tell us about your inquiry..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faPhone} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
            <p className="text-gray-600 leading-relaxed">
              Our customer support team is available around the clock to assist you with any questions or concerns.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faEnvelope} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response</h3>
            <p className="text-gray-600 leading-relaxed">
              We guarantee a response within 24 hours for all inquiries and support requests.
            </p>
          </div>
          
          <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Local Presence</h3>
            <p className="text-gray-600 leading-relaxed">
              Based in Dhaka, Bangladesh, we serve customers across South Asia with local expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
