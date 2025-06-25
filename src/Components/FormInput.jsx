import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormInput({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  readOnly = false,
  className = "",
  ...props
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4 mr-2 text-primary-600" />} {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm ${className}`}
        {...props}
      />
    </div>
  );
}
