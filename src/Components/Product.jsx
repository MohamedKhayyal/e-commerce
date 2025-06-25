import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { cartContext } from "../Feautres/ContextProvider";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import SwiperNavButton from "./SwiperNavButton";
import useFetchProducts from "./useFetchProducts";

export default function Product() {
  const { dispatch } = useContext(cartContext);
  const [setSwiperRef] = useState(null);
  const [stat, setStat] = useState({});

  const { data, loading, error } = useFetchProducts(
    "https://fakestoreapi.com/products"
  );
  const product = data.slice(0, 7);

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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading products.
      </div>
    );

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
              <CountdownTimer targetDate="2025-12-31T23:59:59" />
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
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
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
              <SwiperSlide
                key={item.id}
                virtualIndex={index}
                className="flex h-full"
              >
                <div className="flex flex-col flex-1 h-full min-h-[430px] sm:min-h-[480px] lg:min-h-[520px]">
                  <ProductCard
                    item={item}
                    isWishlisted={stat[index]}
                    onAddToCart={() => addToCart(item)}
                    onAddToWishlist={() => addToWishlist(item, index)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <SwiperNavButton direction="prev">
            <svg
              className="w-5 h-5 text-gray-600"
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
          </SwiperNavButton>

          <SwiperNavButton direction="next">
            <svg
              className="w-5 h-5 text-gray-600"
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
          </SwiperNavButton>
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
