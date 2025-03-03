import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import ContextProvider from "./Feautres/ContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
