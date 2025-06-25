import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { cartContext } from "../Feautres/ContextProvider";
import img2 from "../assets/audio.png";
import ProductCard from "./ProductCard";
import useFetchProducts from "./useFetchProducts";

export default function Product1() {
  const { dispatch } = useContext(cartContext);
  const { data, loading, error } = useFetchProducts(
    "https://fakestoreapi.com/products"
  );
  const product1 = data.slice(8, 12);
  const [stat, setStat] = useState({});
  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading products.
      </div>
    );

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Section Banner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-sm font-medium text-primary-600 mb-3">
              This Month
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
              Best Selling Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-2"></div>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
          >
            View All
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {product1.map((e, index) => (
            <ProductCard
              key={e.id}
              item={e}
              isWishlisted={stat[index]}
              onAddToCart={() => dispatch({ type: "Add", product: e })}
              onAddToWishlist={() => {
                dispatch({ type: "Add_Hart", product: e });
                changeBG(index);
              }}
              badgeText="Best Seller"
              badgeColor="bg-green-500"
            />
          ))}
        </div>
        {/* Section Banner */}
        <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-r from-primary-500/90 to-secondary-500/90 rounded-3xl shadow-large overflow-hidden p-8 md:p-12 gap-8">
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-200 mb-2 uppercase tracking-wider">
              Categories
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
              Enhance Your Music Experience
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
            >
              Buy Now
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              loading="lazy"
              src={img2}
              alt="Slider Image"
              className="h-60 md:h-72 lg:h-80 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
