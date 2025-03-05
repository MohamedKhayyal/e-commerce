import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Signin from "./pages/sign in/Signin";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Header from "./Components/Navigation/Header";
import Fotter from "./Components/footer/Fotter";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/checkOut/Checkout";
import Notfound from "./pages/notFound/Notfound";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="sign" element={<Signin />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Shop />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <ToastContainer />
        <Fotter />
      </BrowserRouter>
    </div>
  );
}
