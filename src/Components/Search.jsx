// import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { cartContext } from "../Feautres/ContextProvider";
import { Link } from "react-router-dom";

export default function Search() {
  const { dispatch } = useContext(cartContext);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const [fakeStoreRes, dummyJsonRes] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://dummyjson.com/products"),
        ]);
        const fakeStoreProducts = fakeStoreRes.data.map((product) => ({
          id: `fake-${product.id}`,
          title: product.title,
          image: product.image,
          price: product.price,
          source: "FakeStore",
        }));

        const dummyJsonProducts = dummyJsonRes.data.products.map((product) => ({
          id: `dummy-${product.id}`,
          title: product.title,
          image: product.thumbnail,
          price: product.price,
          source: "DummyJSON",
        }));

        setProducts([...fakeStoreProducts, ...dummyJsonProducts]);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = query
    ? products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8) // Limit to 8 results for better UX
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
        />
        <FontAwesomeIcon 
          icon={faMagnifyingGlass} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
        />
      </div>
      
      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-large z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-sm">Searching...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="py-2">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <Link 
                      to={`/product-details/${product.id}`}
                      className="flex-shrink-0"
                    >
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200" 
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product-details/${product.id}`}
                        className="block text-sm font-medium text-gray-900 hover:text-primary-600 truncate"
                      >
                        {product.title}
                      </Link>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      dispatch({ type: "Add", product: product });
                      setQuery("");
                    }}
                    className="ml-3 px-3 py-1.5 text-xs font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex-shrink-0"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No products found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
