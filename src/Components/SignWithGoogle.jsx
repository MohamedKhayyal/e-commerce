import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase"; // Import Firestore
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { useNavigate } from "react-router-dom";

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
        type="button"
        className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
        onClick={googleLogin}
      >
        <img
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
          alt="googleLogo"
        />
      </button>
    </div>
  );
}
