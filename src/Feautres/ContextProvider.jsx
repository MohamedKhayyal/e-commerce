import { createContext, useReducer, useEffect, useCallback, useState } from "react";
import { CartReducer } from "./CartReducer";

export const cartContext = createContext();

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Utility functions for localStorage operations
const storageKeys = {
  cart: 'ecommerce-cart',
  wishlist: 'ecommerce-wishlist'
};

const saveToStorage = (key, data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

const loadFromStorage = (key, defaultValue = []) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Utility function to clear all localStorage data
export const clearAllStorage = () => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }
  
  try {
    localStorage.removeItem(storageKeys.cart);
    localStorage.removeItem(storageKeys.wishlist);
    console.log('All localStorage data cleared');
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Utility function to export cart/wishlist data
export const exportData = () => {
  try {
    const cart = loadFromStorage(storageKeys.cart, []);
    const wishlist = loadFromStorage(storageKeys.wishlist, []);
    const data = { cart, wishlist, exportDate: new Date().toISOString() };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecommerce-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting data:', error);
    return false;
  }
};

// Debug component for localStorage management (only show in development)
const StorageDebugger = ({ state, dispatch }) => {
  const [showDebug, setShowDebug] = useState(false);
  
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Storage Debugger"
      >
        🐛
      </button>
      
      {showDebug && (
        <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
          <h3 className="font-bold text-gray-900 mb-2">Storage Debugger</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>localStorage Available:</strong> {isLocalStorageAvailable() ? '✅ Yes' : '❌ No'}
            </div>
            <div>
              <strong>Cart:</strong> {state.cart.length} items
            </div>
            <div>
              <strong>Wishlist:</strong> {state.wishlist.length} items
            </div>
            <div className="pt-2 space-y-1">
              <button
                onClick={() => {
                  clearAllStorage();
                  dispatch({ type: "ClearCart" });
                  dispatch({ type: "ClearWishlist" });
                }}
                className="w-full px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Clear All Data
              </button>
              <button
                onClick={exportData}
                className="w-full px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom hook for localStorage management
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => loadFromStorage(key, defaultValue));

  const setStoredValue = useCallback((newValue) => {
    setValue(newValue);
    saveToStorage(key, newValue);
  }, [key]);

  return [value, setStoredValue];
};

// Load initial state from localStorage
const loadInitialState = () => {
  const cart = loadFromStorage(storageKeys.cart, []);
  const wishlist = loadFromStorage(storageKeys.wishlist, []);
  
  // Log loaded data for debugging
  if (cart.length > 0 || wishlist.length > 0) {
    console.log('Loaded from localStorage:', { cart: cart.length, wishlist: wishlist.length });
  }
  
  return { cart, wishlist };
};

const initialState = loadInitialState();

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const success = saveToStorage(storageKeys.cart, state.cart) && 
                   saveToStorage(storageKeys.wishlist, state.wishlist);
    
    if (success) {
      console.log('State saved to localStorage successfully');
    }
  }, [state.cart, state.wishlist]);

  // Debug logging (remove in production)
  useEffect(() => {
    console.log('Cart updated:', state.cart);
    console.log('Wishlist updated:', state.wishlist);
  }, [state.cart, state.wishlist]);

  // Enhanced dispatch with localStorage sync
  const enhancedDispatch = useCallback((action) => {
    dispatch(action);
    
    // Additional logging for debugging
    console.log('Action dispatched:', action.type, action);
  }, []);

  return (
    <cartContext.Provider value={{ ...state, dispatch: enhancedDispatch }}>
      {children}
      <StorageDebugger state={state} dispatch={enhancedDispatch} />
    </cartContext.Provider>
  );
}
