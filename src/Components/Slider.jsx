import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import img1 from "../assets/iphone.jpeg";
import img3 from "../assets/playStation.png";
import img5 from "../assets/speakers.png";

export default function Slider() {
  const slides = [
    {
      img: img1,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      description: "Experience the latest technology with amazing discounts",
    },
    {
      img: img3,
      title: "PlayStation 5",
      subtitle: "Up to 10% off Voucher",
      description: "Next-gen gaming at unbeatable prices",
    },
    {
      img: img5,
      title: "Premium Speakers",
      subtitle: "Up to 10% off Voucher",
      description: "Crystal clear sound for your entertainment",
    },
  ];

  return (
    <div className="w-full overflow-hidden lg:rounded-2xl lg:shadow-large">
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          renderBullet: function (index, className) {
            return `<span class="${className} w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white/50 hover:bg-white transition-all duration-300"></span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="w-full"
        style={{
          "--swiper-pagination-color": "#0ea5e9",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "8px",
          "--swiper-pagination-bullet-inactive-color": "#cbd5e1",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-navigation-size": "24px",
          "--swiper-navigation-color": "#ffffff",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[500px] bg-gray-200">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover max-w-full max-h-full"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div className="animate-fade-in">
                      <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-white/90 mb-2 sm:mb-3 lg:mb-4">
                        {slide.title}
                      </p>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
                        {slide.subtitle}
                      </h1>
                      <p className="text-gray-200 mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm lg:text-base leading-relaxed max-w-sm lg:max-w-md">
                        {slide.description}
                      </p>
                      <Link
                        to="/shop"
                        className="group inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-white text-gray-900 text-sm sm:text-base font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-soft hover:shadow-large hover:scale-105 active:scale-95"
                      >
                        Shop Now
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-1/4 right-4 sm:right-8 lg:right-16 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-white/10 backdrop-blur-sm rounded-full animate-bounce-gentle"></div>
              <div
                className="absolute bottom-1/4 right-8 sm:right-12 lg:right-24 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-primary-500/20 backdrop-blur-sm rounded-full animate-bounce-gentle"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        aria-label="Previous slide"
        className="swiper-button-prev absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full shadow-soft hover:shadow-medium transition-all duration-200 flex items-center justify-center hover:bg-white/30 hover:scale-110 opacity-0 group-hover:opacity-100 sm:opacity-100"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        aria-label="Next slide"
        className="swiper-button-next absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full shadow-soft hover:shadow-medium transition-all duration-200 flex items-center justify-center hover:bg-white/30 hover:scale-110 opacity-0 group-hover:opacity-100 sm:opacity-100"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Mobile Swipe Tip */}
      <div className="absolute bottom-4 left-4 sm:hidden">
        <div className="flex items-center space-x-2 text-white/70 text-xs">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7l4-4m0 0l4 4m-4-4v18"
              />
            </svg>
          </div>
          <span>Swipe</span>
        </div>
      </div>
    </div>
  );
}
