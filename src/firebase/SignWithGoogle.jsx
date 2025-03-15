import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase"; // Import Firestore
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom";
import img from "./assat/102593215-102593340.png";

export default function SignWithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      if (user) {
        const fullName = user.displayName || "No Name";
        const email = user.email || "";
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email,
            fullName,
            firstName,
            lastName,
          });
        }
        navigate("/home");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  }

  return (
    <div>
      <button
        className="bg-white withEmail"
        style={{
          padding: "16px 80px",
          borderRadius: "5px",
        }}
        onClick={googleLogin}
      >
        <img src={img} style={{ width: "30px" }} alt="Google Logo" />
        <span className="p-4">Sign up with Google</span>
      </button>
    </div>
  );
}
