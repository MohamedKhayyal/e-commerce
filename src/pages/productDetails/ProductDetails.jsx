import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";

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
  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
      <div className="details-container d-flex">
        <div className="products-image">
          <img
            src={product.image}
            className="object-fit-contain p-2"
            alt={product.title}
          />
        </div>
        <div className="product-details">
          <h3>
            {product.title?.length > 50
              ? product.title.slice(0, 50) + "..."
              : product.title}
          </h3>
          <div className="rate d-flex align-items-center justify-content-between">
            <p>{product.rating}⭐</p>
            <p className="shok">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div className="product-price">
            <h3>${product.price}</h3>
          </div>
          <p className="desc">{product.description}</p>
          <div className="change-colors d-flex align-items-center gap-2 mb-3">
            <div className="colors" style={{ color: selectedColor }}>
              Colours:
            </div>
            <input
              type="radio"
              name="color"
              className="radio green"
              onChange={() => setSelectedColor("green")}
            />
            <input
              type="radio"
              name="color"
              className="radio red"
              onChange={() => setSelectedColor("red")}
            />
          </div>
          <div className="product-size d-flex gap-3 mb-3">
            <div className="colors">Size:</div>
            {size.map((e, i) => (
              <p
                key={i}
                className={`${selectId === i ? "bg-red" : ""}`}
                onClick={() => setSelectId(i)}
              >
                {e}
              </p>
            ))}
          </div>
          <div className="chec-product d-flex">
            <div className="qnty d-flex">
              <button onClick={decrease}>-</button>
              <p>{inc}</p>
              <button className="" onClick={increase}>
                +
              </button>
            </div>
            <Link
              to={"/cart"}
              onClick={() => {
                dispatch({
                  type: "Add",
                  product: { ...product, quantity: inc || 1 },
                });
              }}
            >
              Buy Now
            </Link>

            <div className="add-wishlist">
              <button
                className={stat[product.id] ? "red" : "text-dark"}
                onClick={() => {
                  dispatch({ type: "Add_Hart", product });
                  changeBG(product.id);
                }}
              >
                <FontAwesomeIcon icon={faHeart} className="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
