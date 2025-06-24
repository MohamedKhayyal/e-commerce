import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";
import img2 from "./7e210f637fc0504b7d93cd207df744c2.png";

export default function Product1() {
  const { dispatch } = useContext(cartContext);
  const [product1, setProduct1] = useState([]);
  const [stat, setStat] = useState({});
  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProduct1(res.data.slice(8, 12));
    });
  }, []);
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Section Banner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-sm font-medium text-primary-600 mb-3">This Month</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2">Best Selling Products</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-2"></div>
          </div>
          <Link to="/shop" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105">
            View All
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {product1.map((e, index) => (
            <div key={e.id} className="relative group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce-gentle z-10">
                Best Seller
              </div>
              <div className="relative p-6 flex flex-col items-center">
                <Link to={`/product-details/${e.id}`} className="block w-full h-40 flex items-center justify-center mb-4">
                  <img src={e.image} alt={e.title} className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <button
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 ${stat[index] ? 'bg-red-500 text-white shadow-lg animate-pulse' : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 backdrop-blur-sm'}`}
                  onClick={() => {
                    dispatch({ type: "Add_Hart", product: e });
                    changeBG(index);
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => dispatch({ type: "Add", product: e })}
                  className="w-full mt-4 mb-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
                >
                  Add to Cart
                </button>
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 text-center leading-relaxed">
                  {e.title}
                </h3>
                <div className="flex items-center justify-between w-full mt-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-bold text-gray-900">${e.price}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400 mr-1" />
                    <span>{e.rating.rate}</span>
                    <span className="text-gray-400 ml-1">({e.rating.count})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Section Banner */}
        <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-r from-primary-500/90 to-secondary-500/90 rounded-3xl shadow-large overflow-hidden p-8 md:p-12 gap-8">
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-200 mb-2 uppercase tracking-wider">Categories</p>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">Enhance Your Music Experience</h2>
            <Link to="/shop" className="inline-flex items-center px-8 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105">
              Buy Now
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={img2} alt="Slider Image" className="h-60 md:h-72 lg:h-80 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
