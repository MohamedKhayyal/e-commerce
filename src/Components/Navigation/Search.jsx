import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";
import { Link } from "react-router-dom";

export default function Search() {
  const { dispatch } = useContext(cartContext);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
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
          image: product.thumbnail, // DummyJSON uses "thumbnail" instead of "image"
          price: product.price,
          source: "DummyJSON",
        }));

        setProducts([...fakeStoreProducts, ...dummyJsonProducts]);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = query
    ? products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
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
    <div className="search-container" ref={searchRef}>
      <div className="search">
        <input
          type="text"
          placeholder="What Are You Looking For?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      </div>
      {query && (
        <ul className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id} className="search-item">
                <div className="flex-search">
                  <Link to={`/product-details/${product.id}`}>
                    <img src={product.image} className="product-img" alt={product.title} />
                  </Link>
                  <span>
                    {product.title.length > 10
                      ? product.title.substring(0, 10) + "..."
                      : product.title}
                  </span>
                </div>
                <div className="link">
                  <Link
                    className="a"
                    onClick={() => dispatch({ type: "Add", product: product })}
                  >
                    Add to cart
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p className="no-results">No products found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
