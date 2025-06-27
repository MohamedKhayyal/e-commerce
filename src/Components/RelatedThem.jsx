import { useState, useContext, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import SwiperNavButton from "./SwiperNavButton";
import useFetchFirestoreProducts from "./useFetchFirestoreProducts";
import { cartContext } from "../Feautres/ContextProvider";

export default function RelatedThem() {
  const { dispatch } = useContext(cartContext);
  const [stat, setStat] = useState({});
  const { data, loading, error } = useFetchFirestoreProducts();
  const products = useMemo(() => {
    if (data.length > 0) {
      return [...data].sort(() => Math.random() - 0.5).slice(0, 7);
    }
    return [];
  }, [data]);

  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const addToCart = (item) => {
    dispatch({ type: "Add", product: item });
  };

  const addToWishlist = (item, index) => {
    dispatch({ type: "Add_Hart", product: item });
    changeBG(index);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products.
      </div>
    );

  return (
    <section className="py-12 px-2 sm:px-4 md:px-8 lg:px-32">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Them</h2>
      <div className="relative">
        <Swiper
          modules={[Virtual, Navigation]}
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
          className="pb-12"
        >
          {products.map((item, index) => (
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
    </section>
  );
}
