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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">
          Checkout
        </h1>

        <nav className="flex flex-wrap items-center space-x-2 text-sm text-gray-600 mb-8 justify-center lg:justify-start">
          <a href="/" className="flex items-center hover:text-primary-600">
            <FontAwesomeIcon icon={faHome} className="w-4 h-4 mr-1" /> Home
          </a>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <span>Account</span>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <span>My Account</span>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <span>Product</span>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <span>View Cart</span>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          <span className="font-semibold text-gray-900">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white/90 rounded-2xl shadow-soft p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-primary-600" />
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
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded"
                  />
                  <label htmlFor="saveInfo" className="text-sm text-gray-700">
                    <FontAwesomeIcon
                      icon={faSave}
                      className="w-4 h-4 text-primary-600 mr-1"
                    />
                    Save this information for faster check-out next time
                  </label>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white/90 rounded-2xl shadow-soft p-4 sm:p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-primary-600"
                />
                Order Summary
              </h3>
              <div className="space-y-4 mb-4">
                {cart.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl flex-wrap"
                  >
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-12 h-12 object-contain bg-white rounded"
                    />
                    <div className="flex-1">
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
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">${subtotal}</span>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-primary-600"
                  />{" "}
                  Bank Transfer
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="text-green-600"
                  />{" "}
                  Cash on Delivery
                </label>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="text-secondary-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Coupon
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <input
                    type="text"
                    placeholder="Enter coupon"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  />
                  <button className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700">
                    Apply
                  </button>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-bold hover:from-primary-700 hover:to-secondary-700 transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faCheckCircle} /> Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
