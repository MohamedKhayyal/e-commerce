import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faBoxOpen,
  faTimesCircle,
  faStar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
export default function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setOpen(!open);
  };
  const storedEmail = localStorage.getItem("userEmail"); //check if user signIn
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userLastName");
    setUserEmail(null);
    setOpen(!open);
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative" ref={menuRef}>
      <button onClick={toggleMenu} className={"bg-white"}>
        <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "20px" }} />
      </button>
      <div className={`${open ? "abs" : "d-none"}`}>
        <ul
          className={`py-2 d-flex flex-column user ${
            storedEmail ? "h280" : "h220"
          }`}
        >
          <li
            className={`${
              storedEmail ? "d-flex align-items-center" : "d-none"
            }`}
          >
            <Link to={"mange-account"} className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ fontSize: "20px" }}
              />
              <span>Manage My Account</span>
            </Link>
          </li>
          <li className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBoxOpen} style={{ fontSize: "20px" }} />
            <span>My Order</span>
          </li>
          <li className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ fontSize: "20px" }}
            />
            <span>My Cancellations</span>
          </li>
          <li className="d-flex align-items-center">
            <FontAwesomeIcon icon={faStar} style={{ fontSize: "20px" }} />
            <span>My Reviews</span>
          </li>
          {storedEmail ? (
            <li
              className="d-flex align-items-center"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ fontSize: "20px" }}
              />
              <span>Logout</span>
            </li>
          ) : (
            <li
              className="d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <Link to={"/sign"} className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ fontSize: "20px" }}
                />
                <span>signIn</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
