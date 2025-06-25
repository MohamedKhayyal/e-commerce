import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function AuthFields({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="w-4 h-4 mr-2 text-primary-600"
          />
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FontAwesomeIcon
            icon={faLock}
            className="w-4 h-4 mr-2 text-primary-600"
          />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </>
  );
}
