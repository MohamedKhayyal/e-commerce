import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);
  return (
    <div className="flex items-center justify-center mt-16 gap-2 flex-wrap">
      <button
        className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 mr-1" />
        Previous
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`inline-flex items-center px-4 py-2 font-medium rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium ${
            currentPage === num
              ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
