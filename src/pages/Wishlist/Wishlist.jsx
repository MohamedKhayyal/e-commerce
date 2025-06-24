import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faArrowRight, faHeart, faShoppingBag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

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
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 min-h-[60vh] overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-pink-200/40 to-primary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.length > 0 ? (
            wishlist.map((e) => (
              <div key={e.id} className="relative group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Wishlist Badge */}
                <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce-gentle z-10">
                  Wishlist
                </div>
                <div className="relative p-6 flex flex-col items-center">
                  <Link to={`/product-details/${e.id}`} className="block w-full h-40 flex items-center justify-center mb-4">
                    <img src={e.image} alt={e.title} className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <button
                    className="absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 backdrop-blur-sm"
                    onClick={() => dispatch({ type: "RemoveFromWishlist", product: e })}
                    aria-label="Remove from wishlist"
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
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
                    <p className="text-lg font-bold text-gray-900">${e.price}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <FontAwesomeIcon icon={faHeart} className="w-16 h-16 text-pink-300 mb-4 animate-bounce-gentle" />
              <p className="text-lg font-semibold text-gray-400 mb-2">Your wishlist is empty.</p>
              <Link to="/shop" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105">
                <FontAwesomeIcon icon={faArrowRight} className="mr-2 w-5 h-5" />
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
