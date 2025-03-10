import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";

export default function Shop() {
  const { dispatch } = useContext(cartContext);
  const [product, setProduct] = useState([]);
  const [stat, setStat] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      }
    };

    fetchProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(product.length / productsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <>
      <div
        className="month-product d-flex align-items-center flex-wrap"
        style={{ padding: "70px" }}
      >
        {currentProducts.map((e, index) => (
          <div className="box" key={e.id} style={{ height: "450px" }}>
            <div className="box-image">
              <Link to={`/product-details/${e.id}`}>
                <img
                  src={e.image}
                  className="object-fit-contain p-2"
                  alt={e.title}
                />
              </Link>
              <div className="box-icon">
                <button
                  className={` ${stat[index] ? "red" : "text-dark"}`}
                  onClick={() => dispatch({ type: "Add_Hart", product: e })}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icon"
                    onClick={() => changeBG(index)}
                  />
                </button>
              </div>
            </div>
            <div className="box-body">
              <div className="link">
                <Link onClick={() => dispatch({ type: "Add", product: e })}>
                  Add to cart
                </Link>
              </div>
              <div className="title" style={{ width: "300px" }}>
                <p>{e.title}</p>
              </div>
              <div className="price">
                <p>{e.price}$</p>
                <div className="rate">
                  <p className="text-dark">
                    {e.rating}⭐ <span>({e.stock} left)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary mx-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`btn mx-1 ${
              currentPage === num ? "btn-dark" : "btn-light"
            }`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="btn btn-primary mx-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
