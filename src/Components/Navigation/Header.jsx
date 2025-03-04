import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Feautres/ContextProvider";
export default function Header() {
  const { cart } = useContext(cartContext);
  const { hart } = useContext(cartContext);
  return (
    <div className="container">
      <nav>
        <Link to={"/home"}>Exclusive</Link>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/sign">Sign Up</NavLink>
          </li>
        </ul>
        <div className="search">
          <input type="text" placeholder="What Are You Looking For" />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
        <div className="shop-icons">
          <div className="incr d-flex align-items-center">
            <Link to={"/wishlist"}>
              <FontAwesomeIcon icon={faHeart} style={{ fontSize: "15px" }} />
            </Link>
            <p style={{ position: "absolute", left: "10px" }} className="ch">
              {hart.length}
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
        </div>
      </nav>
    </div>
  );
}
