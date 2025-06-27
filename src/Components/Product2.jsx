import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { cartContext } from "../Feautres/ContextProvider";
import ProductCard from "./ProductCard";
import useFetchFirestoreProducts from "./useFetchFirestoreProducts";

export default function Product2() {
  const { dispatch } = useContext(cartContext);
  const { data, loading, error } = useFetchFirestoreProducts();
  const product2 = data.slice(12, 20);
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
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-accent-200/40 to-primary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-sm font-medium text-accent-600 mb-3">
              Our Products
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
              Explore Our Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mb-2"></div>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-accent-600 to-primary-600 text-white font-medium rounded-xl hover:from-accent-700 hover:to-primary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
          >
            View All Products
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {product2.map((e, index) => (
            <ProductCard
              key={e.id}
              item={e}
              isWishlisted={stat[index]}
              onAddToCart={() => dispatch({ type: "Add", product: e })}
              onAddToWishlist={() => {
                dispatch({ type: "Add_Hart", product: e });
                changeBG(index);
              }}
              badgeText="New"
              badgeColor="bg-accent-500"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
