export default function SwiperNavButton({
  direction,
  className = "",
  children,
}) {
  const baseClass =
    "absolute top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white border border-gray-200 rounded-full shadow-soft hover:shadow-medium transition-all duration-200 flex items-center justify-center hover:scale-110";
  const dirClass =
    direction === "prev"
      ? "swiper-button-prev left-0"
      : "swiper-button-next right-0";
  return (
    <button className={`${dirClass} ${baseClass} ${className}`}>
      {children}
    </button>
  );
}
