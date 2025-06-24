import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartShopping,
  faXmark,
  faSearch,
  faBars,
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-soft'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              ref={burgerRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
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
            className="text-2xl lg:text-3xl font-display font-bold text-gradient hover:scale-105 transition-transform duration-300"
          >
            Exclusive
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 relative ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"></div>
                  )}
                </>
              )}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 relative ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Contact
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"></div>
                  )}
                </>
              )}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 relative ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"></div>
                  )}
                </>
              )}
            </NavLink>
            {!user && (
              <NavLink
                to="/sign"
                className="btn-primary text-sm hover:scale-105 transition-transform duration-200"
              >
                Sign Up
              </NavLink>
            )}
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <Search />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile search button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist"
              className="relative p-2 rounded-lg text-gray-600 hover:text-secondary-600 hover:bg-secondary-50 transition-all duration-200 hover:scale-110"
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
              className="relative p-2 rounded-lg text-gray-600 hover:text-accent-600 hover:bg-accent-50 transition-all duration-200 hover:scale-110"
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
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-up">
            <Search />
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div 
              ref={menuRef}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <div 
                className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  >
                    <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                  </button>
                </div>
                <nav className="p-6 space-y-2">
                  <NavLink
                    to="/home"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                  <NavLink
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    About
                  </NavLink>
                  {!user && (
                    <NavLink
                      to="/sign"
                      onClick={() => setIsOpen(false)}
                      className="block py-4 px-4 rounded-xl text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 mt-4"
                    >
                      Sign Up
                    </NavLink>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
