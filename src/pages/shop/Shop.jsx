import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faStar, faChevronLeft, faChevronRight, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";
import { toast } from "react-toastify";

export default function Shop() {
  const { dispatch } = useContext(cartContext);
  const [product, setProduct] = useState([]);
  const [stat, setStat] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 12;

  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const addToCart = (item) => {
    dispatch({ type: "Add", product: item });
    toast.success(`${item.title.substring(0, 30)}... added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const addToWishlist = (item, index) => {
    dispatch({ type: "Add_Hart", product: item });
    changeBG(index);
    toast.success(`${item.title.substring(0, 30)}... added to wishlist!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [fakeStoreRes, dummyJsonRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://dummyjson.com/products"),
        ]);

        const fakeStoreProducts = fakeStoreRes.data.map((item) => ({
          id: `fake-${item.id}`,
          title: item.title,
          price: item.price,
          image: item.image,
          rating: item.rating.rate,
          stock: item.rating.count,
        }));

        const dummyJsonProducts = dummyJsonRes.data.products.map((item) => ({
          id: `dummy-${item.id}`,
          title: item.title,
          price: item.price,
          image: item.thumbnail,
          rating: item.rating,
          stock: item.stock,
        }));

        setProduct([...fakeStoreProducts, ...dummyJsonProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(product.length / productsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  if (loading) {
    return (
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-primary-500 w-7 h-7" />
            Shop <span className="text-base font-medium text-gray-400">({product.length} products)</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentProducts.map((e, index) => (
            <div key={e.id} className="relative group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft hover:shadow-large transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="relative p-6 flex flex-col items-center">
                <Link to={`/product-details/${e.id}`} className="block w-full h-40 flex items-center justify-center mb-4">
                  <img src={e.image} alt={e.title} className="max-h-36 object-contain group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <button
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 backdrop-blur-sm ${
                    stat[index] 
                      ? "bg-red-50 text-red-500" 
                      : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                  onClick={() => addToWishlist(e, index)}
                  aria-label="Add to wishlist"
                >
                  <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => addToCart(e)}
                  className="w-full mt-4 mb-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
                  Add to Cart
                </button>
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 text-center leading-relaxed">
                  {e.title}
                </h3>
                <div className="flex items-center justify-between w-full mt-2">
                  <p className="text-lg font-bold text-gray-900">${e.price}</p>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600">{e.rating}</span>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <p className="text-xs text-gray-500 text-center">
                    {e.stock} left in stock
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-16 gap-2">
            <button
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo(0, 0);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 mr-1" />
              Previous
            </button>
            {pageNumbers.map((num) => (
              <button
                key={num}
                className={`inline-flex items-center px-4 py-2 font-medium rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium ${
                  currentPage === num 
                    ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white" 
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setCurrentPage(num);
                  window.scrollTo(0, 0);
                }}
              >
                {num}
              </button>
            ))}
            <button
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo(0, 0);
              }}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
