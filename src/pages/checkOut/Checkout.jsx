import "./index.scss";
import { cartContext } from "../../Feautres/ContextProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useContext(cartContext);
  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.warning("Your cart is Empty", {
        position: "top-center",
      });
      navigate("/shop");
    }
  }, [cart, navigate]);
  const subtotal = cart
    .filter((product) => product.price)
    .reduce(
      (acc, product) =>
        acc + (parseFloat(product.price) || 0) * (product.quantity || 1),
      0
    )
    .toFixed(2);
  return (
    <div className="cart-container">
      <p>
        Account / My Account / Product / View Cart / <b>CheckOut</b>
      </p>
      <div className="details d-flex justify-content-between">
        <div className="inputs d-flex flex-column">
          <h2>Billing Details</h2>
          <label>First Name</label>
          <input className="inp" type="text" />
          <label>Company Name</label>
          <input className="inp" type="text" />
          <label>Street Address</label>
          <input className="inp" type="text" />
          <label>Apartment, floor, etc. (optional)</label>
          <input className="inp" type="text" />
          <label>Town/City</label>
          <input className="inp" type="text" />
          <label>Phone Number</label>
          <input className="inp" type="email" />
          <label>Email Address</label>
          <input className="inp" type="text" />
          <div className="check-Box d-flex align-items-center">
            <input type="checkbox" id="checkbox" class="custom-checkbox" />
            <label for="checkbox" style={{ opacity: "100%" }}>
              Save this information for faster check-out next time
            </label>
          </div>
        </div>
        <div className="chechout-data">
          <div className="cart-datas">
            {cart.map((e) => (
              <div
                key={e.id}
                className="head-details d-flex align-items-center p-3"
              >
                <div className="body-details d-flex align-items-center">
                  <div className="delete-cart">
                    <img src={e.image} alt="Product" width={50} />
                  </div>
                  <p>
                    {e.title.length > 12
                      ? e.title.slice(0, 12) + "..."
                      : e.title}
                  </p>
                </div>
                <p>
                  ${e.price ? ((e.quantity || 1) * e.price).toFixed(2) : "0.00"}
                </p>
              </div>
            ))}
          </div>
          <div className="checkout" style={{ marginTop: "50px" }}>
            <p style={{ fontSize: "20px", fontWeight: "500" }}>Checkout</p>
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
          </div>
          <div className="radios d-flex flex-column">
            <div className="input1 d-flex align-items-center">
              <input type="radio" id="option1" name="options" value="option1" />
              <label htmlFor="option1" className="label">
                Bank
              </label>
            </div>
            <div className="input2 d-flex align-items-center">
              <input type="radio" id="option2" name="options" value="option2" />
              <label htmlFor="option2" className="label">
                Cash on delivery
              </label>
            </div>
          </div>
          <div className="cabon">
            <input type="text" placeholder="Coupon Code" />
            <button>Apply Coupon</button>
          </div>
          <button className="placeOrder">Place Order</button>
        </div>
      </div>
    </div>
  );
}
