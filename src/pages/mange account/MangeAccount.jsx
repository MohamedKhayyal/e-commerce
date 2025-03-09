import React from "react";
import "./index.scss";
export default function MangeAccount() {
  const storedEmail = localStorage.getItem("userEmail"); //check if user signIn
  const storedName = localStorage.getItem("userName"); //check if user signIn
  const firstName = localStorage.getItem("userFirstName"); //check if user signIn
  const lastName = localStorage.getItem("userLastName"); //check if user signIn

  return (
    <div className="cart-container">
      <div className="loac-name d-flex justify-content-between pb-5">
        <p>
          Home / <b>My Account</b>
        </p>
        <p>
          Welcome <span className="red">{storedName}</span>
        </p>
      </div>
      <div className="mange-acc-profile d-flex justify-content-between">
        <div className="profile">
          <ul>
            <li>
              <b>Manage My Account</b>
            </li>
            <ul>
              <li>
                <p className="red opacity-100 mt-3">My Profile</p>
              </li>
              <li>
                <p>Address Book</p>
              </li>
              <li>
                <p>My Payment Options</p>
              </li>
            </ul>
          </ul>
          <ul>
            <li>
              <b>My Orders</b>
            </li>
            <ul>
              <li>
                <p className="mt-3">My Returns</p>
              </li>
              <li>
                <p>My Cancellations</p>
              </li>
            </ul>
          </ul>
          <ul>
            <li>
              <b>My WishList</b>
            </li>
          </ul>
        </div>
        <div className="edit-profile head-detail d-flex flex-column shadow mb-5 bg-body-white rounded">
          <p className="red">Edit Your Profile</p>
          <div className="names d-flex align-items-center justify-content-between mb-3">
            <div className="firstName d-flex flex-column gap-2">
              <label>First Name</label>
              <input type="text" placeholder={firstName} />
            </div>
            <div className="lastName d-flex flex-column gap-2">
              <label>Last Name</label>
              <input type="text" placeholder={lastName} />
            </div>
          </div>
          <div className="names d-flex align-items-center justify-content-between mb-3">
            <div className="firstName d-flex flex-column gap-2">
              <label>Email</label>
              <input type="email" placeholder={storedEmail} />
            </div>
            <div className="lastName d-flex flex-column gap-2">
              <label>Address</label>
              <input type="text" placeholder="Kingston, 5236, United State" />
            </div>
          </div>
          <div className="passwords d-flex flex-column">
            <p>Password Changes</p>
            <input type="password" placeholder="Current Passwod" />
            <input type="password" placeholder="New Passwod" />
            <input type="password" placeholder="Confirm New Passwod" />
          </div>
          <div className="buttons">
            <button className="bg-white">Cancle</button>
            <button className="bton">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
