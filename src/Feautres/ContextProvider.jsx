import { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

export const cartContext = createContext();

const initialState = { cart: [], hart: [] };

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <cartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
}
