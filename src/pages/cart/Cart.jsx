import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { cartContext } from "../../Feautres/ContextProvider";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, dispatch } = useContext(cartContext);
  const subtotal = cart
    .filter((product) => product.price)
    .reduce(
      (acc, product) =>
        acc + (parseFloat(product.price) || 0) * (product.quantity || 1),
      0
    )
    .toFixed(2);
  const increase = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };
  return (
    <div className="cart-container">
      <p>
        Home / <b>Cart</b>
      </p>
      <div className="cart-product">
        <div className="head-detail d-flex align-items-center justify-content-between shadow p-3 mb-5 bg-body-tertiary rounded">
          <p>Product</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="head-detail d-flex align-items-center justify-content-between shadow p-3 mb-5 bg-body-tertiary rounded"
            >
              <img src={product.image} alt="Product" width={50} />
              <p>
                {product.title.length > 12
                  ? product.title.slice(0, 12) + "..."
                  : product.title}
              </p>
              <p>${product.price ? product.price.toFixed(2) : "0.00"}</p>
              <div className="qty">
                <span>{product.quantity || 1}</span>

                <div className="inc-dec d-flex flex-column align-items-center justify-content-between">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => increase(product.id)}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => decrease(product.id)}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </span>
                </div>
              </div>
              <p>
                $
                {product.price
                  ? ((product.quantity || 1) * product.price).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cartLink d-flex align-items-center justify-content-between">
        <Link to="/shop" className="cart-btn">
          Return To Shop
        </Link>
        <button
          className="cart-btn"
          onClick={() => dispatch({ type: "UPDATE_CART" })}
        >
          Update Cart
        </button>
      </div>
      <div className="buy d-flex justify-content-between">
        <div className="cabon">
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
        <div className="checkout">
          <p style={{ fontSize: "20px", fontWeight: "500" }}>Cart Total</p>
          <div className="sub d-flex align-items-center justify-content-between">
            <p>Subtotal:</p>
            <p>${subtotal}</p>
          </div>
          <div className="shipping d-flex align-items-center justify-content-between">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="total d-flex align-items-center justify-content-between">
            <p>Total:</p>
            <p>${subtotal}</p>
          </div>
          <div className="buy-link">
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
