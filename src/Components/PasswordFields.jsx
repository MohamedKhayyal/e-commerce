import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PasswordFields({ formData, onChange }) {
  return (
    <div className="border-t border-gray-200 pt-6 lg:pt-8">
      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-2">
        <FontAwesomeIcon
          icon="faLock"
          className="text-secondary-600 w-4 h-4 lg:w-5 lg:h-5"
        />
        Password Changes
      </h3>
      <div className="space-y-4 lg:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            value={formData.currentPassword}
            onChange={onChange}
            className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm text-sm lg:text-base"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={onChange}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm text-sm lg:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm new password"
              value={formData.confirmNewPassword}
              onChange={onChange}
              className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm text-sm lg:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
