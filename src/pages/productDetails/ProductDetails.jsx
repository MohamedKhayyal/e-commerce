import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";

export default function ProductDetails() {
  const { dispatch } = useContext(cartContext);
  const [selectedColor, setSelectedColor] = useState("");
  const [product, setProducts] = useState({});
  const [inc, setInc] = useState(1);
  const [stat, setStat] = useState({});
  const [selectId, setSelectId] = useState(null);
  const size = ["XS", "S", "M", "L", "XL"];
  let parm = useParams();
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${parm.id}`).then((res) => {
      setProducts(res.data);
    });
  }, []);
  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };
  const Increace = () => {
    setInc(inc + 1);
  };
  const Decreace = () => {
    if (inc > 1) {
      setInc(inc - 1);
    }
  };
  return (
    <div>
      <div className="details-container d-flex">
        <div className="products-image">
          <img src={product.image} className="object-fit-contain p-2" />
        </div>
        <div className="product-details">
          <h3>
            {product?.title
              ? product.title.slice(0, 50) +
                (product.title.length > 10 ? "..." : "")
              : ""}
          </h3>
          <div className="rate d-flex align-items-center justify-content-between">
            <p>{product.rating?.rate || product.rating}⭐</p>
            <p className="shok">In Stock</p>
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
              id="option 1"
              className="radio green"
              onChange={() => setSelectedColor("green")}
            />
            <input
              type="radio"
              name="color"
              id="option 2"
              className="radio red"
              onChange={() => setSelectedColor("red")}
            />
          </div>
          <div className="product-size d-flex  gap-3 mb-3">
            <div className="colors">Size:</div>
            {size.map((e, i) => {
              return (
                <p
                  key={i}
                  className={`${selectId == i ? "bg-red" : ""}`}
                  onClick={() => setSelectId(i)}
                >
                  {e}
                </p>
              );
            })}
          </div>
          <div className="chec-product d-flex">
            <div className="qnty d-flex">
              <button onClick={Decreace}>-</button>
              <p>{inc}</p>
              <button className="red" onClick={Increace}>
                +
              </button>
            </div>
            <Link
              to={"/cart"}
              onClick={() => dispatch({ type: "Add", product: product })}
            >
              Buy Now
            </Link>
            <div className="add-wishlest">
              <button
                className={` ${stat[product.id] ? "red" : "text-dark"}`}
                onClick={() => dispatch({ type: "Add_Hart", product: product })}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="icon"
                  onClick={() => changeBG(product.id)}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
