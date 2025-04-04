import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreen,
  faGamepad,
  faDesktop,
  faStopwatch,
  faCamera,
  faHeadphones,
  faTruck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { useState } from "react";
import img3 from "./0c1817d3afa266b3c9f8c81ff0ed4428.png";
import img4 from "./08463f7e8f57dd3048a2444dbfa0cb90.jpeg";
import img5 from "./2977438364a41d7e8c9d1e9a794d43ed.png";
import img6 from "./5102562cf220504d288fa568eaa816dd.png";
import Product from "./Product";
import Product1 from "./Product1";
import Product2 from "./Product2";
import Slider from "./Slider";
export default function Home() {
  const [selectId, setSelectId] = useState(null);
  const category = [
    { icone: <FontAwesomeIcon icon={faMobileScreen} />, name: "Phones" },
    { icone: <FontAwesomeIcon icon={faDesktop} />, name: "Computers" },
    { icone: <FontAwesomeIcon icon={faStopwatch} />, name: "SmartWatch" },
    { icone: <FontAwesomeIcon icon={faCamera} />, name: "Camera" },
    { icone: <FontAwesomeIcon icon={faHeadphones} />, name: "HeadPhones" },
    { icone: <FontAwesomeIcon icon={faGamepad} />, name: "Gaming" },
  ];
  return (
    <div className="col-12">
      <div className="home-container">
        <div className="top-home d-flex">
          <div className="links-left">
            <Link>
              Woman’s Fashion <span style={{ fontSize: "25px" }}>&gt;</span>
            </Link>
            <Link>
              Men’s Fashion <span style={{ fontSize: "25px" }}>&gt;</span>
            </Link>
            <Link>Electronics</Link>
            <Link>Home & Lifestyle</Link>
            <Link>Medicine</Link>
            <Link>Sports & Outdoor</Link>
            <Link>Baby’s & Toys</Link>
            <Link>Groceries & Pets</Link>
            <Link>Health & Beauty</Link>
          </div>
          <Slider />
        </div>
        <Product />
        <div className="Categories">
          <p className="aftr">Categories</p>
          <div className="timer" style={{ paddingBottom: "40px" }}>
            <h1>Browse By Category</h1>
          </div>
          <div className="category-items text-center">
            {category.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`${selectId == i ? "bgred" : "browse-items"}`}
                  onClick={() => setSelectId(i)}
                >
                  <p className="browse-icon">{e.icone}</p>
                  <p>{e.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <Product1 />
        <Product2 />
        <div className="Featured">
          <p className="aftr">Featured</p>
          <div className="timer d-flex align-items-center">
            <h1>New Arrival</h1>
          </div>
          <div className="new-arrival-images">
            <div className="img-3">
              <img src={img3} alt="" className="img-fluid" />
              <div className="img3-text">
                <h3>PlayStation 5</h3>
                <p>Black and White version of the PS5 coming out on sale.</p>
                <Link to="/shop">Shop Now</Link>
              </div>
            </div>
            <div className="new-arrival-right">
              <div className="img-4">
                <img src={img4} alt="" className="img-fluid" />
                <div className="img3-text">
                  <h3>Women’s Collections</h3>
                  <p>Featured woman collections that give you another vibe.</p>
                  <Link to="/shop">Shop Now</Link>
                </div>
              </div>
              <div className="parfan">
                <div className="img-5">
                  <img src={img5} alt="" className="img-fluid" />
                  <div className="img3-text">
                    <h3>Speakers</h3>
                    <p>Amazon wireless speakers</p>
                    <Link to="/shop">Shop Now</Link>
                  </div>
                </div>
                <div className="img-6">
                  <img src={img6} alt="" className="img-fluid" />
                  <div className="img3-text">
                    <h3>Perfume</h3>
                    <p>GUCCI INTENSE OUD EDP</p>
                    <Link to="/shop">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="delevery d-flex align-items-center "
            style={{ paddingTop: "70px", textAlign: "center", gap: "250px" }}
          >
            <div className="delevery-icon">
              <div className="i">
                <div className="icon-icon">
                  <FontAwesomeIcon icon={faTruck} className="icon" />
                </div>
              </div>
              <p>FREE AND FAST DELIVERY</p>
              <p className="last">Free delivery for all orders over $140</p>
            </div>
            <div className="delevery-icon">
              <div className="i">
                <div className="icon-icon">
                  <FontAwesomeIcon icon={faHeadphones} className="icon" />
                </div>
              </div>
              <p>24/7 CUSTOMER SERVICE</p>
              <p className="last">Friendly 24/7 customer support</p>
            </div>
            <div className="delevery-icon">
              <div className="i">
                <div className="icon-icon">
                  <FontAwesomeIcon icon={faCheck} className="icon" />
                </div>
              </div>
              <p>MONEY BACK GUARANTEE</p>
              <p className="last">We reurn money within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
