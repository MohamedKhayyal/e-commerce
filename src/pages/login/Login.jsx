import { signInWithEmailAndPassword } from "firebase/auth";
import img1 from "./assat/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      
      const fullName = res.user.displayName || "";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || ""; // Get first name
      const lastName = nameParts.slice(1).join(" ") || ""; // Get last name (if any)

      // Store in localStorage
      localStorage.setItem("userFullName", fullName);
      localStorage.setItem("userFirstName", firstName);
      localStorage.setItem("userLastName", lastName);
      localStorage.setItem("userEmail", res.user.email);

      navigate("/home");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="signin">
      <div className="left-side">
        <img src={img1} alt="Sign In" />
      </div>
      <div className="right-side">
        <h1>Log in to Exclusive</h1>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit}>
          <input
            className="pt-4"
            type="email"
            placeholder="Email or phone number"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex align-items-center gap-5">
            <button type="submit">Log In</button>
            <span
              style={{
                color: "#db4444",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Forget Password?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
