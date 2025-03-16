import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "./7215f42e5883a64157f0aa3a4d1a866a.jpeg";
import img3 from "./0c1817d3afa266b3c9f8c81ff0ed4428.png";
import img5 from "./2977438364a41d7e8c9d1e9a794d43ed.png";

export default function Slider() {
  return (
    <div className="slider">
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {[
          { img: img1, title: "iPhone 14 Series" },
          { img: img3, title: "PlayStation 5" },
          { img: img5, title: "Speaker" },
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-inner">
              <div className="text-slider">
                <p>{slide.title}</p>
                <h1>Up to 10% off Voucher</h1>
                <Link to={"/shop"}>
                  Shop Now
                  <span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </Link>
              </div>
              <img src={slide.img} alt={slide.title} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
