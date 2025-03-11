import "./index.scss";
import img1 from "./asset/qr-barcode-for-data-labeling-1257966228-0dcfa9a3fbad4721aa5717bf13953adf.jpg";
import img2 from "./asset/preview_d605be53ac335ec29de57d357cb82436.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Fotter() {
  return (
    <div className="fotter-container">
      <div className="fotter">
        <div className="exclucive">
          <h4>Exclusive</h4>
          <p style={{ fontSize: "20px" }}>Subscribe</p>
          <p style={{ fontSize: "15px" }}>Get 10% off your first order</p>
          <div className="send">
            <input
              type="email"
              placeholder="Enter Your Email"
              style={{ paddingRight: "50px" }}
            />
            <span>
              <FontAwesomeIcon icon={faShare} />
            </span>
          </div>
        </div>
        <div className="support">
          <h4 style={{ fontSize: "20px" }}>Support</h4>
          <p style={{ fontSize: "15px", width: "175px" }}>
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p style={{ fontSize: "15px" }}>exclusive@gmail.com</p>
          <p style={{ fontSize: "15px" }}>+88015-88888-9999</p>
        </div>
        <div className="account">
          <h4 style={{ fontSize: "20px" }}>Account</h4>
          <div className="linkes d-flex flex-column gap-2">
            <Link
              to={"/mange-account"}
              style={{ fontSize: "15px", color: "white" }}
            >
              My Account
            </Link>
            <Link to={"/login"} style={{ fontSize: "15px", color: "white" }}>
              Login / Register
            </Link>
            <Link to={"/cart"} style={{ fontSize: "15px", color: "white" }}>
              Cart
            </Link>
            <Link to={"/wishlist"} style={{ fontSize: "15px", color: "white" }}>
              Wishlist
            </Link>
            <Link to={"/shop"} style={{ fontSize: "15px", color: "white" }}>
              Shop
            </Link>
          </div>
        </div>
        <div className="link">
          <h4 style={{ fontSize: "20px" }}>Quick Link</h4>
          <p style={{ fontSize: "15px" }}>Privacy Policy</p>
          <p style={{ fontSize: "15px" }}>Terms Of Use</p>
          <p style={{ fontSize: "15px" }}>FAQ</p>
          <Link to={"/contact"} style={{ fontSize: "15px", color: "white" }}>
            Contact
          </Link>
        </div>
        <div className="download">
          <h4 style={{ fontSize: "20px" }}>Download App</h4>
          <p style={{ fontSize: "12px" }}>Save $3 with App New User Only</p>
          <div className="google-icon">
            <img src={img1} />
            <img src={img2} />
          </div>
        </div>
      </div>
      <p className="botton-foot">
        &copy; Copyright Rimet {new Date().getFullYear()} All right reserved
      </p>
    </div>
  );
}
