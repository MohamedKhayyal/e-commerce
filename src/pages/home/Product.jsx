import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";
import { toast } from "react-toastify";

export default function Product() {
  const { dispatch } = useContext(cartContext);
  const [product, setProduct] = useState([]);
  const [setSwiperRef] = useState(null);
  const [stat, setStat] = useState({});

  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const addToCart = (item) => {
    dispatch({ type: "Add", product: item });
    toast.success(`${item.title.substring(0, 30)}... added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const addToWishlist = (item, index) => {
    dispatch({ type: "Add_Hart", product: item });
    changeBG(index);
    toast.success(`${item.title.substring(0, 30)}... added to wishlist!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProduct(res.data.slice(0, 7));
    });
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-medium text-primary-600 mb-3">Today's</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-8 mb-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Flash Sales
            </h2>
            <div className="bg-white rounded-2xl px-6 py-3 shadow-soft border border-gray-100">
              <CountdownTimer targetDate="2025-05-02T00:00:00" />
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Virtual, Navigation]}
            onSwiper={setSwiperRef}
            spaceBetween={20}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              1536: { slidesPerView: 5, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 16 },
              480: { slidesPerView: 1, spaceBetween: 12 },
            }}
            className="pb-16"
          >
            {product.map((item, index) => (
              <SwiperSlide key={item.id} virtualIndex={index}>
                <div className="card group hover:shadow-large transition-all duration-500 hover:-translate-y-2">
                  <div className="relative p-6">
                    <Link to={`/product-details/${item.id}`}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 lg:h-56 object-contain group-hover:scale-110 transition-transform duration-500" 
                      />
                    </Link>
                    
                    <button
                      onClick={() => addToWishlist(item, index)}
                      className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                        stat[index] 
                          ? 'bg-red-500 text-white shadow-lg animate-pulse' 
                          : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 backdrop-blur-sm'
                      }`}
                    >
                      <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                    </button>

                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -20%
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                    >
                      Add to Cart
                    </button>
                    
                    <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-relaxed">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * 0.8).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-400 line-through">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400 mr-1" />
                        <span>{item.rating.rate}</span>
                        <span className="text-gray-400 ml-1">
                          ({item.rating.count})
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full" style={{width: `${Math.random() * 40 + 60}%`}}></div>
                    </div>
                    <p className="text-xs text-gray-500">Sold: {Math.floor(Math.random() * 50 + 20)}%</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-soft hover:shadow-medium transition-all duration-200 flex items-center justify-center hover:scale-110">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-soft hover:shadow-medium transition-all duration-200 flex items-center justify-center hover:scale-110">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/shop" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
          >
            View All Products
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
