import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Signin from "./pages/sign in/Signin";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Header from "./Components/Navigation/Header";
import Fotter from "./Components/footer/Fotter";
import Cart from "./pages/cart/Cart";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Signin />} path="sign" />
          <Route element={<Login />} path="login" />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <ToastContainer />
        <Fotter />
      </BrowserRouter>
    </div>
  );
}
