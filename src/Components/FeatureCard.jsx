import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FeatureCard({ icon, title, description, iconClass, bgClass }) {
  return (
    <div className="text-center group">
      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 ${bgClass}`}>
        <FontAwesomeIcon icon={icon} className={iconClass} />
      </div>
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 max-w-xs mx-auto">
        {title}
      </h3>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
}
