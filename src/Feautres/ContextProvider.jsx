import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";
import { CartReducer } from "./CartReducer";

export const cartContext = createContext();

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = "localStorage";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Utility functions for localStorage operations
const storageKeys = {
  cart: "ecommerce-cart",
  wishlist: "ecommerce-wishlist",
};

const saveToStorage = (key, data) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
};

const loadFromStorage = (key, defaultValue = []) => {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

// Utility function to clear all localStorage data
export const clearAllStorage = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(storageKeys.cart);
    localStorage.removeItem(storageKeys.wishlist);
    return true;
  } catch (error) {
    return false;
  }
};

// Utility function to export cart/wishlist data
export const exportData = () => {
  try {
    const cart = loadFromStorage(storageKeys.cart, []);
    const wishlist = loadFromStorage(storageKeys.wishlist, []);
    const data = { cart, wishlist, exportDate: new Date().toISOString() };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ecommerce-data-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    return false;
  }
};

// Debug component for localStorage management (only show in development)
const StorageDebugger = ({ state, dispatch }) => {
  const [showDebug, setShowDebug] = useState(false);

  if (process.env.NODE_ENV !== "development") return null;
};

// Custom hook for localStorage management
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => loadFromStorage(key, defaultValue));

  const setStoredValue = useCallback(
    (newValue) => {
      setValue(newValue);
      saveToStorage(key, newValue);
    },
    [key]
  );

  return [value, setStoredValue];
};

// Load initial state from localStorage
const loadInitialState = () => {
  const cart = loadFromStorage(storageKeys.cart, []);
  const wishlist = loadFromStorage(storageKeys.wishlist, []);

  return { cart, wishlist };
};

const initialState = loadInitialState();

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const success =
      saveToStorage(storageKeys.cart, state.cart) &&
      saveToStorage(storageKeys.wishlist, state.wishlist);
  }, [state.cart, state.wishlist]);

  // Enhanced dispatch with localStorage sync
  const enhancedDispatch = useCallback((action) => {
    dispatch(action);
  }, []);

  return (
    <cartContext.Provider value={{ ...state, dispatch: enhancedDispatch }}>
      {children}
      <StorageDebugger state={state} dispatch={enhancedDispatch} />
    </cartContext.Provider>
  );
}
