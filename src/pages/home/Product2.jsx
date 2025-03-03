import "./index.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";
export default function Product2() {
  const { dispatch } = useContext(cartContext);
  const [product2, setProduct2] = useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProduct2(res.data.slice(12, 20));
    });
  }, []);
  return (
    <div className="our-product">
      <p className="aftr">Our Products</p>
      <div className="timer d-flex align-items-center">
        <h1>Explore Our Products</h1>
      </div>
      <div
        className="month-product d-flex align-items-center flex-wrap"
        style={{ paddingBottom: "50px" }}
      >
        {product2.map((e) => (
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
      <Link className="view-product">View All Products</Link>
    </div>
  );
}
