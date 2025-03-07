import { Link, useNavigate } from "react-router-dom";
import img1 from "./assat/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import "./index.scss";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import SignWithGoogle from "../../firebase/SignWithGoogle";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
      }
      toast.success("User Registered successfully", {
        position: "top-center",
      });
      navigate("/login");
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
          <h1>Create an account</h1>
          <p>Enter your details</p>
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
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
            <button>Create Account</button>
          </form>
          <SignWithGoogle />
          <div className="login">
            <span>Already have account?</span>
            <Link to={"/login"}>Log in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
