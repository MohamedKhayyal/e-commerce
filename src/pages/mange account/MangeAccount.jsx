import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronRight,
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faBox,
  faHeart,
  faLock,
  faSave,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import FormInput from "../../Components/FormInput";
import PasswordFields from "../../Components/PasswordFields";

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
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Manage Account</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-4 lg:p-6">
              <nav className="space-y-4 lg:space-y-6">
                {/* Manage My Account */}
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-primary-600 w-4 h-4 lg:w-5 lg:h-5"
                    />
                    Manage My Account
                  </h3>
                  <ul className="space-y-2 lg:space-y-3 ml-4 lg:ml-6">
                    <li>
                      <button className="text-primary-600 font-medium text-left w-full py-2 px-3 rounded-lg bg-primary-50 border border-primary-100 text-sm lg:text-base">
                        My Profile
                      </button>
                    </li>
                    <li>
                      <button className="text-gray-600 hover:text-primary-600 font-medium text-left w-full py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm lg:text-base">
                        Address Book
                      </button>
                    </li>
                    <li>
                      <button className="text-gray-600 hover:text-primary-600 font-medium text-left w-full py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm lg:text-base">
                        My Payment Options
                      </button>
                    </li>
                  </ul>
                </div>

                {/* My Orders */}
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faBox}
                      className="text-secondary-600 w-4 h-4 lg:w-5 lg:h-5"
                    />
                    My Orders
                  </h3>
                  <ul className="space-y-2 lg:space-y-3 ml-4 lg:ml-6">
                    <li>
                      <button className="text-gray-600 hover:text-secondary-600 font-medium text-left w-full py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm lg:text-base">
                        My Returns
                      </button>
                    </li>
                    <li>
                      <button className="text-gray-600 hover:text-secondary-600 font-medium text-left w-full py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm lg:text-base">
                        My Cancellations
                      </button>
                    </li>
                  </ul>
                </div>

                {/* My WishList */}
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-pink-600 w-4 h-4 lg:w-5 lg:h-5"
                    />
                    My WishList
                  </h3>
                  <ul className="space-y-2 lg:space-y-3 ml-4 lg:ml-6">
                    <li>
                      <Link
                        to="/wishlist"
                        className="text-gray-600 hover:text-pink-600 font-medium text-left w-full py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 block text-sm lg:text-base"
                      >
                        View Wishlist
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-soft p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-primary-600 w-5 h-5 lg:w-6 lg:h-6"
                />
                Edit Your Profile
              </h2>

              <form className="space-y-6 lg:space-y-8">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <FormInput
                    label="Full Name"
                    icon={faUser}
                    name="fullName"
                    value={formData.fullName}
                    readOnly
                    className="cursor-not-allowed text-gray-500 bg-gray-50"
                  />
                  <FormInput
                    label="Last Name"
                    icon={faUser}
                    name="lastName"
                    value={formData.lastName}
                    readOnly
                    className="cursor-not-allowed text-gray-500 bg-gray-50"
                  />
                </div>

                {/* Email and Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <FormInput
                    label="Email Address"
                    icon={faEnvelope}
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="cursor-not-allowed text-gray-500 bg-gray-50"
                  />
                  <FormInput
                    label="Address"
                    icon={faMapMarkerAlt}
                    name="address"
                    value={formData.address}
                    readOnly
                    className="cursor-not-allowed text-gray-500 bg-gray-50"
                  />
                </div>

                {/* Password Changes */}
                <PasswordFields formData={formData} onChange={handleChange} />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-6">
                  <Link
                    to="/home"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 lg:px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium text-sm lg:text-base"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="w-4 h-4 mr-2"
                    />
                    Cancel
                  </Link>
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 lg:px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105 text-sm lg:text-base"
                  >
                    <FontAwesomeIcon icon={faSave} className="w-4 h-4 mr-2" />
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
