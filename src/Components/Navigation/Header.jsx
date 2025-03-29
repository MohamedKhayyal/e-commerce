import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { cartContext } from "../../Feautres/ContextProvider";
import Search from "./Search";
import User from "./User";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export default function Header() {
  const [user] = useAuthState(auth);
  const { cart, wishlist } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <nav>
        <div
          ref={burgerRef}
          className={`burger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to="/home" className="logo">
          Exclusive
        </Link>
        <ul ref={menuRef} className={`nav-links ${isOpen ? "open" : ""}`}>
          <li className="lik text-black" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </li>
          <li>
            <NavLink
              className="link"
              to="/home"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link"
              to="/contact"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              className="link"
              to="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink
                className="link"
                to="/sign"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </li>
          )}
        </ul>
        <Search />
        <div className="shop-icons">
          <div className="incr d-flex align-items-center">
            <Link to="/wishlist">
              <FontAwesomeIcon icon={faHeart} style={{ fontSize: "15px" }} />
            </Link>
            {wishlist.length > 0 && <p className="ch">{wishlist.length}</p>}
          </div>
          <div className="incr d-flex align-items-center">
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ fontSize: "15px" }}
              />
            </Link>
            {cart.length > 0 && <p className="ch">{cart.length}</p>}
          </div>
          <User />
        </div>
      </nav>
    </div>
  );
}
