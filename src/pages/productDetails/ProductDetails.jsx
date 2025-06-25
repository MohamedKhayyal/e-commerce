import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faCheckCircle,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";
import { toast } from "react-toastify";
import ProductCard from "../../Components/ProductCard";

export default function ProductDetails() {
  const { state, dispatch } = useContext(cartContext) || {
    state: { cart: [] },
    dispatch: () => {},
  };
  const [selectedColor, setSelectedColor] = useState("");
  const [product, setProduct] = useState(null);
  const [inc, setInc] = useState(1);
  const [stat, setStat] = useState({});
  const [selectId, setSelectId] = useState(null);
  const size = ["XS", "S", "M", "L", "XL"];
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let res;
        if (id.startsWith("dummy-")) {
          res = await axios.get(
            `https://dummyjson.com/products/${id.replace("dummy-", "")}`
          );
          setProduct({
            id: res.data.id,
            title: res.data.title,
            price: res.data.price,
            image: res.data.thumbnail,
            rating: res.data.rating,
            stock: res.data.stock,
            description: res.data.description,
          });
        } else {
          res = await axios.get(
            `https://fakestoreapi.com/products/${id.replace("fake-", "")}`
          );
          setProduct({
            id: res.data.id,
            title: res.data.title,
            price: res.data.price,
            image: res.data.image,
            rating: res.data.rating.rate,
            stock: res.data.rating.count,
            description: res.data.description,
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const changeBG = (productId) => {
    setStat((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const addToWishlist = () => {
    dispatch({ type: "Add_Hart", product });
    changeBG(product.id);
    toast.success(`${product.title.substring(0, 30)}... added to wishlist!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const addToCart = () => {
    dispatch({
      type: "Add",
      product: { ...product, quantity: inc || 1 },
    });
    toast.success(`${product.title.substring(0, 30)}... added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const increase = () => {
    setInc((prev) => prev + 1);
    dispatch({ type: "INCREASE_QUANTITY", payload: product.id });
  };

  const decrease = () => {
    if (inc > 1) {
      setInc((prev) => prev - 1);
      dispatch({ type: "DECREASE_QUANTITY", payload: product.id });
    }
  };
  useEffect(() => {
    if (!state || !state.cart) return;
    const cartItem = state.cart.find((item) => item.id === Number(id));
    setInc(cartItem ? cartItem.quantity : 1);
  }, [id, state?.cart]);
  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-lg font-semibold text-gray-500">
        Loading product details...
      </div>
    );

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-white to-gray-50 min-h-[80vh] overflow-hidden">
      <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-large p-4 sm:p-8 md:p-10 lg:p-16 border border-gray-100">
          {/* Product Image */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-md flex-shrink-0 flex flex-col items-center justify-center mx-auto">
            <div className="relative w-full aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-soft overflow-hidden flex items-center justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-md">
              <img
                loading="lazy"
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4 sm:p-6 drop-shadow-xl transition-transform duration-500 hover:scale-105 max-w-full max-h-full"
              />
              {/* Wishlist Button */}
              <button
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 ${
                  stat[product.id]
                    ? "bg-red-500 text-white shadow-lg animate-pulse"
                    : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 backdrop-blur-sm"
                }`}
                onClick={addToWishlist}
                aria-label="Add to wishlist"
              >
                <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {product.title?.length > 70
                ? product.title.slice(0, 70) + "..."
                : product.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
              <span className="flex items-center text-base sm:text-lg font-semibold text-yellow-500">
                <FontAwesomeIcon icon={faStar} className="w-5 h-5 mr-1" />
                {product.rating}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="w-4 h-4 mr-1"
                />
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 mb-2">
              <span className="text-2xl sm:text-3xl font-bold text-primary-600">
                ${product.price}
              </span>
              {product.price > 100 && (
                <span className="text-base text-gray-400 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              )}
            </div>
            <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2 line-clamp-5">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="font-medium text-gray-700">Color:</span>
              <button
                className={`w-7 h-7 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${
                  selectedColor === "green"
                    ? "ring-2 ring-green-500 border-green-500 scale-110"
                    : ""
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #22c55e 60%, #16a34a 100%)",
                }}
                onClick={() => setSelectedColor("green")}
                aria-label="Select green color"
              ></button>
              <button
                className={`w-7 h-7 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 ${
                  selectedColor === "red"
                    ? "ring-2 ring-red-500 border-red-500 scale-110"
                    : ""
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, #ef4444 60%, #b91c1c 100%)",
                }}
                onClick={() => setSelectedColor("red")}
                aria-label="Select red color"
              ></button>
            </div>

            {/* Size Selection */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="font-medium text-gray-700">Size:</span>
              {size.map((e, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${
                    selectId === i
                      ? "bg-primary-600 text-white border-primary-600 scale-110 shadow-soft"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-primary-50 hover:border-primary-400"
                  }`}
                  onClick={() => setSelectId(i)}
                >
                  {e}
                </button>
              ))}
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-soft">
                <button
                  onClick={decrease}
                  className="px-3 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="px-4 py-2 text-lg font-semibold text-gray-900 bg-gray-50 min-w-[40px] text-center">
                  {inc}
                </span>
                <button
                  onClick={increase}
                  className="px-3 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <Link
                to={"/cart"}
                onClick={addToCart}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-large hover:scale-105 w-full sm:w-auto text-center justify-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
