import { signInWithEmailAndPassword } from "firebase/auth";
import img1 from "./assat/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userEmail", email);
      navigate("/home");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <div className="signin">
        <div className="left-side">
          <img src={img1} alt="" />
        </div>
        <div className="right-side">
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>
          <form onSubmit={handelSubmit}>
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
              <button>Log In</button>
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
    </>
  );
}
