import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faBoxOpen,
  faTimesCircle,
  faStar,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function User() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [user] = useAuthState(auth);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      setOpen(false);
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
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
      >
        <FontAwesomeIcon icon={faCircleUser} className="w-5 h-5" />
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-3 h-3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-large border border-gray-200 z-[9999]">
          <div className="py-2">
            {user && (
              <Link
                to="/mange-account"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="w-4 h-4 text-primary-600"
                />
                <span>Manage My Account</span>
              </Link>
            )}

            <Link
              to={"/checkout"}
              onClick={() => setOpen(false)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="w-4 h-4 text-accent-600"
              />
              <span>My Orders</span>
            </Link>

            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="w-4 h-4 text-red-600"
              />
              <span>My Cancellations</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon
                icon={faStar}
                className="w-4 h-4 text-yellow-500"
              />
              <span>My Reviews</span>
            </button>

            <div className="border-t border-gray-100 my-2"></div>

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/sign"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-sm text-primary-600 hover:bg-primary-50 transition-colors"
              >
                <FontAwesomeIcon icon={faCircleUser} className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
