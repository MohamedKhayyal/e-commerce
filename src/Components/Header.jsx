import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faXmark,
  faSearch,
  faBars,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { cartContext } from "../Feautres/ContextProvider";
import Search from "./Search";
import User from "./User";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
  const [user] = useAuthState(auth);
  const { cart, wishlist } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return setIsAdmin(false);
      try {
        const ref = doc(db, "admins", user.uid);
        const snap = await getDoc(ref);
        setIsAdmin(snap.exists() && snap.data().role === "admin");
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className=" transition-all duration-300 bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20 gap-2">
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              ref={burgerRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200"
              aria-label="Open menu"
            >
              <FontAwesomeIcon
                icon={isOpen ? faXmark : faBars}
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* Logo */}
          <Link
            to="/home"
            className="text-2xl lg:text-3xl font-display font-bold text-gradient hover:scale-105 transition-transform duration-300 whitespace-nowrap"
            aria-label="Go to homepage"
          >
            Exclusive
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {["home", "contact", "about"].map((route) => (
              <NavLink
                key={route}
                to={`/${route}`}
                className={({ isActive }) =>
                  `text-base font-medium transition-all duration-200 relative px-2 py-1 rounded-lg ${
                    isActive
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                  }`
                }
              >
                {route.charAt(0).toUpperCase() + route.slice(1)}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-base font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
                      : "bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white"
                  }`
                }
              >
                <FontAwesomeIcon icon={faGaugeHigh} className="w-5 h-5" />
                Dashboard
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/sign"
                className="btn-primary text-base font-semibold px-4 py-2 rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Sign Up
              </NavLink>
            )}
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <Search />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200"
              aria-label="Open search"
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-gray-600 hover:text-secondary-600 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-200 transition-all duration-200 hover:scale-110"
              aria-label="Go to wishlist"
            >
              <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-bounce-gentle">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-gray-600 hover:text-accent-600 hover:bg-accent-50 focus:outline-none focus:ring-2 focus:ring-accent-200 transition-all duration-200 hover:scale-110"
              aria-label="Go to cart"
            >
              <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-bounce-gentle">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User */}
            <User />
          </div>
        </nav>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-up bg-white/95 backdrop-blur-md relative z-[101]">
            <Search />
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-[9999] lg:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div
              ref={menuRef}
              className="fixed inset-y-0 left-0 w-72 max-w-[90vw] h-full bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
                {["home", "contact", "about"].map((route) => (
                  <NavLink
                    key={route}
                    to={`/${route}`}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary-50 text-primary-600 border-l-4 border-primary-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {route.charAt(0).toUpperCase() + route.slice(1)}
                  </NavLink>
                ))}
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 block py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
                          : "bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white"
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faGaugeHigh} className="w-5 h-5" />
                    Dashboard
                  </NavLink>
                )}
                {!user && (
                  <NavLink
                    to="/sign"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 rounded-xl text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 mt-4"
                  >
                    Sign Up
                  </NavLink>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
