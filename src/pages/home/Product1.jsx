import "./index.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";
import img2 from "./7e210f637fc0504b7d93cd207df744c2.png";
export default function Product1() {
  const { dispatch } = useContext(cartContext);
  const [product1, setProduct1] = useState([]);
  const [stat, setStat] = useState({});
  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProduct1(res.data.slice(8, 12));
    });
  }, []);
  return (
    <div className="this-month">
      <p className="aftr">This Month</p>
      <div className="timer d-flex flex-wrap">
        <h1>Best Selling Products</h1>
        <Link to={"/shop"} className="view">
          View All
        </Link>
      </div>
      <div
        className="month-product d-flex align-items-center flex-wrap"
        style={{ paddingBottom: "50px" }}
      >
        {product1.map((e, index) => (
          <div className="box" key={e.id} style={{ height: "450px" }}>
            <div className="box-image">
              <Link to={`/product-details/${e.id}`}>
                <img src={e.image} className="object-fit-contain p-2" />
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
                {e.rating.rate}⭐ <span>({e.rating.count} left)</span>
                </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="month-imge">
        <div className="slider-inners">
          <div className="text-slider">
            <p style={{ color: "#00FF66" }}>Categories</p>
            <h1 style={{ marginBottom: "50px" }}>
              Enhance Your Music Experience
            </h1>
            <Link to={"/shop"}>Buy Now</Link>
          </div>
          <img src={img2} alt="Slider Image" style={{ height: "330px" }} />
        </div>
      </div>
    </div>
  );
}
