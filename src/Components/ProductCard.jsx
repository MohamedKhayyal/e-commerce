import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import DiscountBadge from "./DiscountBadge";
import ProgressBar from "./ProgressBar";

export default function ProductCard({
  item,
  isWishlisted,
  onAddToCart,
  onAddToWishlist,
  badgeText,
  badgeColor,
}) {
  return (
    <div className="card group hover:shadow-large transition-all duration-500 hover:-translate-y-2 flex flex-col flex-1 h-full min-h-[430px] sm:min-h-[480px] lg:min-h-[520px]">
      <div className="relative p-4 sm:p-6 flex-1 flex flex-col">
        <Link to={`/product-details/${item.id}`}>
          <img
            loading="lazy"
            src={item.image}
            alt={item.title}
            className="w-full h-40 sm:h-48 lg:h-56 object-contain group-hover:scale-110 transition-transform duration-500 max-w-full max-h-56"
            style={{ minHeight: "160px", maxHeight: "224px" }}
          />
        </Link>
        <button
          onClick={onAddToWishlist}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
            isWishlisted
              ? "bg-red-500 text-white shadow-lg animate-pulse"
              : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 backdrop-blur-sm"
          }`}
        >
          <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
        </button>
        {badgeText ? (
          <div
            className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 ${
              badgeColor || "bg-red-500"
            }`}
          >
            {badgeText}
          </div>
        ) : (
          <DiscountBadge />
        )}
      </div>
      <div className="p-6 pt-0 flex flex-col flex-1 justify-between">
        <button
          onClick={onAddToCart}
          className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105"
        >
          Add to Cart
        </button>
        <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-relaxed">
          {item.title}
        </h3>
        <div className="flex items-center justify-between mb-3 flex-wrap">
          <div className="flex items-center space-x-2">
            <p className="text-lg font-bold text-gray-900">
              ${(item.price * 0.8).toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 line-through">${item.price}</p>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FontAwesomeIcon
              icon={faStar}
              className="w-3 h-3 text-yellow-400 mr-1"
            />
            <span>
              {typeof item.rating === "object" && item.rating !== null
                ? item.rating.rate ?? "-"
                : typeof item.rating === "number"
                ? item.rating.toFixed(1)
                : "-"}
            </span>
            <span className="text-gray-400 ml-1">
              (
              {typeof item.rating === "object" && item.rating !== null
                ? item.rating.count ?? item.stock ?? "-"
                : item.stock ?? "-"}
              )
            </span>
          </div>
        </div>
        <ProgressBar />
        <p className="text-xs text-gray-500">
          Sold: {Math.floor(Math.random() * 50 + 20)}%
        </p>
      </div>
    </div>
  );
}
