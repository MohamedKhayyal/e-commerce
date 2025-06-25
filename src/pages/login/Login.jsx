import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSpinner, faKey } from "@fortawesome/free-solid-svg-icons";
import img1 from "../../assets/sigin.jpeg";
import AuthFields from "../../Components/AuthFields";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <section className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-secondary-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Image */}
            <div className="hidden lg:block">
              <div className="relative group">
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-3xl p-2 shadow-soft">
                  <img
                    src={img1}
                    alt="Sign In"
                    className="w-full h-auto rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500 max-w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-8 lg:p-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Log in to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                    Exclusive
                  </span>
                </h1>
                <p className="text-gray-600">Enter your details below</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AuthFields
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 mr-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="w-4 h-4 animate-spin"
                        />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                        Log In
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faKey} className="w-4 h-4" />
                    Forgot Password?
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Social Login Placeholder */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Don't have an account?
                </p>
                <button
                  onClick={() => navigate("/sign")}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
