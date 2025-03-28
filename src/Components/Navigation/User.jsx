import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
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
  const menuRef = useRef(null);
  const [user] = useAuthState(auth); // Track auth state

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      setOpen(!open);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
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
      <button onClick={toggleMenu} className="bg-white">
        <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "20px" }} />
      </button>
      <div className={` ${open ? "abs" : "d-none"}`}>
        <ul className="py-2 d-flex flex-column user pb-3">
          {user && (
            <li
              className="d-flex align-items-center"
              onClick={() => setOpen(false)}
            >
              <Link to="/mange-account" className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ fontSize: "20px" }}
                />
                <span>Manage My Account</span>
              </Link>
            </li>
          )}
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

          {user ? (
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
              <Link to="/sign" className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ fontSize: "20px" }}
                />
                <span>Sign In</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
