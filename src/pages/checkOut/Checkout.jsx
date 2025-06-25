import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronRight,
  faUser,
  faBuilding,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faCreditCard,
  faMoneyBillWave,
  faTag,
  faShoppingCart,
  faCheckCircle,
  faSave,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { cartContext } from "../../Feautres/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../../Components/FormInput";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useContext(cartContext);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [saveInfo, setSaveInfo] = useState(false);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.warning("Your cart is Empty", {
        position: "top-center",
      });
      navigate("/shop");
    }
  }, [cart, navigate]);

  const subtotal = cart
    .filter((product) => product.price)
    .reduce(
      (acc, product) =>
        acc + (parseFloat(product.price) || 0) * (product.quantity || 1),
      0
    )
    .toFixed(2);

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!", {
      position: "top-center",
    });
    navigate("/home");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Checkout
        </h1>
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-12 flex-wrap">
            <a
              href="/"
              className="flex items-center hover:text-primary-600 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-1" />
              Home
            </a>
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            <span className="text-gray-600">Account</span>
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            <span className="text-gray-600">My Account</span>
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            <span className="text-gray-600">Product</span>
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            <span className="text-gray-600">View Cart</span>
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            <span className="font-semibold text-gray-900">Checkout</span>
          </nav>

          {/* Billing Details Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-4 sm:p-8 mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-primary-600 w-6 h-6"
                />
                Billing Details
              </h2>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    icon={faUser}
                    placeholder="Enter your first name"
                  />
                  <FormInput
                    label="Company Name"
                    icon={faBuilding}
                    placeholder="Enter company name (optional)"
                  />
                </div>
                <FormInput
                  label="Street Address"
                  icon={faMapMarkerAlt}
                  placeholder="Enter your street address"
                />
                <FormInput
                  label="Apartment, floor, etc. (optional)"
                  placeholder="Apartment, suite, floor, etc."
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Town/City"
                    icon={faMapMarkerAlt}
                    placeholder="Enter your city"
                  />
                  <FormInput
                    label="Phone Number"
                    icon={faPhone}
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>
                <FormInput
                  label="Email Address"
                  icon={faEnvelope}
                  type="email"
                  placeholder="Enter your email address"
                />
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      className="w-4 h-4 text-primary-600"
                    />
                    Save this information for faster check-out next time
                  </label>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2 w-full">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-4 sm:p-6 mb-4 lg:mb-0 lg:sticky lg:top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-primary-600 w-5 h-5"
                />
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <img
                      loading="lazy"
                      src={e.image}
                      alt={e.title}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {e.title.length > 20
                          ? e.title.slice(0, 20) + "..."
                          : e.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {e.quantity || 1}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      $
                      {e.price
                        ? ((e.quantity || 1) * e.price).toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                ))}
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
                  <span className="text-gray-600">Shipping:</span>
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

              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="w-4 h-4 text-primary-600"
                  />
                  Payment Method
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="w-5 h-5 text-primary-600"
                    />
                    <span className="font-medium text-gray-900">
                      Bank Transfer
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="w-5 h-5 text-green-600"
                    />
                    <span className="font-medium text-gray-900">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>

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

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
