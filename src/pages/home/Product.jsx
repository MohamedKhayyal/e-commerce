import "./index.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { cartContext } from "../../Feautres/ContextProvider";
export default function Product() {
  const { dispatch } = useContext(cartContext);
  const [product, setProduct] = useState([]);
  const [setSwiperRef] = useState(null);
  const [stat, setStat] = useState({});
  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProduct(res.data.slice(0, 7));
      console.log(res.data);
    });
  }, []);
  return (
    <div className="Flash-Sales">
      <p className="aftr">Today’s</p>
      <div className="timer d-flex align-items-center">
        <h1>Flash Sales</h1>
        <CountdownTimer targetDate="2025-03-01T00:00:00" />
      </div>
      <div className="product-item1 ">
        <Swiper
          style={{ paddingBottom: "30px" }}
          modules={[Virtual, Navigation]}
          onSwiper={setSwiperRef}
          slidesPerView={4}
          spaceBetween={30}
          pagination={{ type: "fraction" }}
          navigation={
            ({
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            },
            true)
          }
          centeredSlides={false}
        >
          {product.map((e, index) => (
            <SwiperSlide key={e.id} virtualIndex={index} className="p-4">
              <div className="box">
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
                  <div className="title">
                    <p>{e.title}</p>
                  </div>
                  <div className="price">
                    <p>{e.price}$</p>
                    <div className="rate">
                    <p>⭐⭐⭐⭐⭐ <span>({e.rating .count})</span></p>
                  </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to={"/shop"} className="view-product">
          View All Products
        </Link>
      </div>
    </div>
  );
}
