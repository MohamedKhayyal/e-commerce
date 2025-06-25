import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faHome,
  faChevronRight,
  faShoppingCart,
  faTrash,
  faTag,
  faCreditCard,
  faTruck,
  faArrowLeft,
  faRefresh,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { cartContext } from "../../Feautres/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, dispatch } = useContext(cartContext);
  const navigate = useNavigate();

  const subtotal = cart
    .filter((product) => product.price)
    .reduce(
      (acc, product) =>
        acc + (parseFloat(product.price) || 0) * (product.quantity || 1),
      0
    )
    .toFixed(2);

  const increase = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const chLocation = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is Empty", {
        position: "top-center",
      });
      navigate("/shop");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 min-h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <a
            href="/"
            className="flex items-center hover:text-primary-600 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-1" />
            Home
          </a>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <span className="font-semibold text-gray-900">Cart</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-primary-600 w-5 h-5 sm:w-6 sm:h-6"
                />
                Shopping Cart ({cart.length})
              </h2>

              {cart.length > 0 ? (
                <div className="space-y-4 sm:space-y-6 overflow-x-auto">
                  {cart.map((e) => (
                    <div
                      key={e.id}
                      className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 min-w-0"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product-details/${e.id}`}
                        className="flex-shrink-0 mb-2 sm:mb-0"
                      >
                        <img
                          loading="lazy"
                          src={e.image}
                          alt={e.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl bg-gray-50 p-1 sm:p-2 hover:scale-105 transition-transform duration-200"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 text-center sm:text-left break-words">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-normal break-words">
                          {e.title}
                        </h3>
                        <p className="text-base sm:text-lg font-bold text-primary-600 mt-1">
                          ${e.price ? e.price.toFixed(2) : "0.00"}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                        <div className="flex items-center bg-gray-50 rounded-xl p-1">
                          <button
                            onClick={() => decrease(e.id)}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors duration-200"
                          >
                            <FontAwesomeIcon
                              icon={faArrowDown}
                              className="w-3 h-3 text-gray-600"
                            />
                          </button>
                          <span className="w-8 sm:w-12 text-center font-semibold text-gray-900">
                            {e.quantity || 1}
                          </span>
                          <button
                            onClick={() => increase(e.id)}
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors duration-200"
                          >
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              className="w-3 h-3 text-gray-600"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right mt-2 sm:mt-0 text-xs sm:text-base">
                        <p className="font-bold text-gray-900">
                          $
                          {e.price
                            ? ((e.quantity || 1) * e.price).toFixed(2)
                            : "0.00"}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          dispatch({ type: "RemoveFromCart", product: e })
                        }
                        className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-200 hover:scale-110 mt-2 sm:mt-0"
                        aria-label="Remove item"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="w-16 h-16 text-gray-300 mb-4"
                  />
                  <p className="text-lg font-semibold text-gray-400 mb-2">
                    Your cart is empty.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="w-4 h-4 mr-2"
                    />
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {cart.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-4 h-4 mr-2"
                  />
                  Return To Shop
                </Link>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to clear your cart?"
                      )
                    ) {
                      dispatch({ type: "ClearCart" });
                      toast.success("Cart cleared successfully!");
                    }
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all duration-200 shadow-soft hover:shadow-medium"
                >
                  <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 mr-2" />
                  Clear Cart
                </button>
                <button
                  onClick={() => dispatch({ type: "UPDATE_CART" })}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white font-medium rounded-xl hover:from-secondary-700 hover:to-secondary-800 transition-all duration-200 shadow-soft hover:shadow-medium"
                >
                  <FontAwesomeIcon icon={faRefresh} className="w-4 h-4 mr-2" />
                  Update Cart
                </button>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="text-primary-600 w-5 h-5"
                />
                Cart Total
              </h3>

              {/* Coupon Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="text-secondary-600 w-4 h-4"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Coupon Code
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <input
                    type="text"
                    placeholder="Enter coupon"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200">
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="w-4 h-4 text-green-500"
                    />
                    Shipping:
                  </span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${subtotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={chLocation}
                disabled={cart.length === 0}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {cart.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
