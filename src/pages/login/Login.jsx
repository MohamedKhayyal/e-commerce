import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase";
import img1 from "./assat/a1c7dc5b68a42239311e510f54d8cd59.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For button loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back, ${res.user.displayName || "User"}!`, {
        position: "top-center",
      });
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.", {
          position: "bottom-center",
        });
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.", {
          position: "bottom-center",
        });
      } else {
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    }
    setLoading(false);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex align-items-center gap-5">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
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
