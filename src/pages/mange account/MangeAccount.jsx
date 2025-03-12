import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import "./index.scss";
import { doc, getDoc } from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";

export default function MangeAccount() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "Users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData);
          setFormData((prev) => ({
            ...prev,
            fullName: userData.fullName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            address: userData.address || "",
          }));
        }
      }
    };
    fetchUserData();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangePassword = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("No user is signed in.");
        return;
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("New passwords do not match.");
        return;
      }
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        formData.currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, formData.newPassword);
      toast.success("Password updated successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Check your current password.");
    }
  };
  return (
    <div className="cart-container">
      <div className="loac-name d-flex justify-content-between pb-5">
        <p>
          Home / <b>My Account</b>
        </p>
        <p>
          Welcome <span className="red">{user?.fullName}</span>
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
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                readOnly
              />
            </div>
            <div className="lastName d-flex flex-column gap-2">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                readOnly
              />
            </div>
          </div>
          <div className="passwords d-flex flex-column">
            <p>Password Changes</p>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </div>
          <div className="buttons">
            <Link to={"/home"} className="bg-white">
              Cancel
            </Link>
            <button className="bton" onClick={handleChangePassword}>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
