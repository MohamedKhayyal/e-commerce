import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./pages/sign in/Signin";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Header from "./Components/Header";
import Fotter from "./Components/Fotter";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/checkOut/Checkout";
import Notfound from "./pages/notFound/Notfound";
import ProductDetails from "./pages/productDetails/ProductDetails";
import MangeAccount from "./pages/mange account/MangeAccount";
import Contact from "./pages/contact/Contact";
import About from "./pages/About/About";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthRoute from "./Components/AuthRoute";
import ScrollTop from "./Components/scrollTop";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./Components/AdminRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <Header />
        <ScrollTop />
        <main className="flex-1">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
            <Route path="wishlist" element={<Wishlist />} />
            {/* Protect login and sign-up pages */}
            <Route
              path="sign"
              element={
                <AuthRoute>
                  <Signin />
                </AuthRoute>
              }
            />
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            {/* Protected Routes */}
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="mange-account"
              element={
                <ProtectedRoute>
                  <MangeAccount />
                </ProtectedRoute>
              }
            />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Fotter />
      </BrowserRouter>
    </div>
  );
}
