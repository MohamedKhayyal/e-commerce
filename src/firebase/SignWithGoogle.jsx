import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import img from "./assat/102593215-102593340.png";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
export default function SignWithGoogle() {
  const nanigate = useNavigate();
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      if (res.user) {
        localStorage.setItem("userEmail", res.user.email);
        nanigate("/home");
      }
    });
  }
  return (
    <div>
      <button
        className="m-4  bg-white"
        style={{
          padding: "16px 122px",
          border: "2px solid #ddd",
          borderRadius: "5px",
        }}
        onClick={googleLogin}
      >
        <img src={img} width={"100%"} style={{ width: "30px" }} />
        <span className="p-4">Sign up with Google</span>
      </button>
    </div>
  );
}
