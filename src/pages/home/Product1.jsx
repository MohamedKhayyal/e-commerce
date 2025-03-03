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

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProduct1(res.data.slice(8, 12));
    });
  }, []);
  return (
    <div className="this-month">
      <p className="aftr">This Month</p>
      <div className="timer d-flex align-items-center justify-content-between">
        <h1>Best Selling Products</h1>
        <p className="view">View All</p>
      </div>
      <div
        className="month-product d-flex align-items-center flex-wrap"
        style={{ paddingBottom: "50px" }}
      >
        {product1.map((e) => (
          <div className="box" key={e.id} style={{ height: "450px" }}>
            <div className="box-image">
              <img src={e.image} className="object-fit-contain p-2" />
              <div className="box-icon">
                <FontAwesomeIcon icon={faHeart} className="icon" />
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
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="month-imge">
        <div className="slider-inner">
          <div className="text-slider">
            <p style={{ color: "#00FF66" }}>Categories</p>
            <h1 style={{ marginBottom: "50px" }}>
              Enhance Your Music Experience
            </h1>
            <Link>Buy Now</Link>
          </div>
          <img src={img2} alt="Slider Image" style={{ height: "330px" }} />
        </div>
      </div>
    </div>
  );
}
