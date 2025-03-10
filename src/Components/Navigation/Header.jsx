import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Feautres/ContextProvider";
import Search from "./Search";
import User from "./User";
export default function Header() {
  const { cart } = useContext(cartContext);
  const { wishlist } = useContext(cartContext);
  return (
    <div className="container">
      <nav>
        <Link to={"/home"}>Exclusive</Link>
        <ul>
          <li>
            <NavLink className={"link"} to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={"link"} to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink className={"link"} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className={"link"} to="/sign">
              Sign Up
            </NavLink>
          </li>
        </ul>
        <Search />
        <div className="shop-icons">
          <div className="incr d-flex align-items-center">
            <Link to={"/wishlist"}>
              <FontAwesomeIcon icon={faHeart} style={{ fontSize: "15px" }} />
            </Link>
            <p style={{ position: "absolute", left: "10px" }} className="ch">
              {wishlist.length}
            </p>
          </div>
          <div className="incr d-flex align-items-center">
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ fontSize: "15px" }}
              />
            </Link>
            <p style={{ position: "absolute", left: "10px" }} className="ch">
              {cart.length}
            </p>
          </div>
          <User />
        </div>
      </nav>
    </div>
  );
}
