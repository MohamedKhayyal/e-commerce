import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import img3 from "../assets/playStation.png";
import img4 from "../assets/womenCollection.jpeg";
import img5 from "../assets/speakers.png";
import img6 from "../assets/perfume.png";

export default function NewArrival() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="text-xs sm:text-sm font-medium text-primary-600 mb-2">
            Featured
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3">
            New Arrival
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        {/* Product Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left - Large Product */}
          <div className="relative group overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
            <img
              loading="lazy"
              src={img3}
              alt="PlayStation 5"
              className="w-full h-56 xs:h-64 sm:h-80 md:h-96 lg:h-[420px] object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2">
                PlayStation 5
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-200 mb-4">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
              >
                Shop Now
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side Products */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Top Right Banner */}
            <div className="relative group overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
              <img
                loading="lazy"
                src={img4}
                alt="Women's Collections"
                className="w-full h-36 sm:h-44 md:h-52 lg:h-60 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                  Women's Collections
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mb-3">
                  Featured woman collections that give you another vibe.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-gray-900 text-xs sm:text-sm font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                >
                  Shop Now
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2 w-3 h-3"
                  />
                </Link>
              </div>
            </div>

            {/* Bottom Right 2-Column Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
              {/* Speakers */}
              <div className="relative group overflow-hidden rounded-xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
                <img
                  loading="lazy"
                  src={img5}
                  alt="Speakers"
                  className="w-full h-32 sm:h-36 md:h-40 lg:h-44 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <h3 className="text-sm sm:text-lg font-bold mb-1">
                    Speakers
                  </h3>
                  <p className="text-xs text-gray-200 mb-2">
                    Amazon wireless speakers
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-white text-gray-900 text-xs font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                  >
                    Shop Now
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-1 w-3 h-3"
                    />
                  </Link>
                </div>
              </div>

              {/* Perfume */}
              <div className="relative group overflow-hidden rounded-xl bg-white shadow-soft hover:shadow-large transition-all duration-500">
                <img
                  loading="lazy"
                  src={img6}
                  alt="Perfume"
                  className="w-full h-32 sm:h-36 md:h-40 lg:h-44 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <h3 className="text-sm sm:text-lg font-bold mb-1">Perfume</h3>
                  <p className="text-xs text-gray-200 mb-2">
                    GUCCI INTENSE OUD EDP
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-white text-gray-900 text-xs font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                  >
                    Shop Now
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-1 w-3 h-3"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
