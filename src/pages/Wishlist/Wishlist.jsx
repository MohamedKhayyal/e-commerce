import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowRight, faHeart, faShoppingBag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ProductCard from "../../Components/ProductCard";

export default function Wishlist() {
  const { wishlist, dispatch } = useContext(cartContext);

  const moveAllToCart = () => {
    wishlist.forEach((item) => {
      dispatch({ type: "Add", product: item });
    });
    dispatch({ type: "ClearWishlist" });
    toast.success("All items moved to cart!");
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      dispatch({ type: "ClearWishlist" });
      toast.success("Wishlist cleared successfully!");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Wishlist</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 flex items-center gap-2">
            <FontAwesomeIcon icon={faHeart} className="text-pink-500 w-7 h-7 animate-bounce-gentle" />
            Wishlist <span className="text-base font-medium text-gray-400">({wishlist.length})</span>
          </h2>
          {wishlist.length !== 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
                onClick={moveAllToCart}
              >
                <FontAwesomeIcon icon={faShoppingBag} className="mr-2 w-5 h-5" />
                Move All To Bag
              </button>
              <button
                className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
                onClick={clearWishlist}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2 w-5 h-5" />
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {wishlist.map((item, index) => (
            <ProductCard
              key={item.id}
              item={item}
              isWishlisted={true}
              onAddToCart={() => dispatch({ type: "Add", product: item })}
              onAddToWishlist={() => dispatch({ type: "RemoveFromWishlist", product: item })}
              badgeText="Wishlist"
              badgeColor="bg-pink-500"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
