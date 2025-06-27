import { useContext, useState } from "react";
import { cartContext } from "../../Feautres/ContextProvider";
import { toast } from "react-toastify";
import ProductCard from "../../Components/ProductCard";
import useFetchFirestoreProducts from "../../Components/useFetchFirestoreProducts";
import Pagination from "../../Components/Pagination";

export default function Shop() {
  const { dispatch } = useContext(cartContext);
  const { data: product, loading, error } = useFetchFirestoreProducts();
  const [stat, setStat] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const changeBG = (i) => {
    setStat((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const addToCart = (item) => {
    dispatch({ type: "Add", product: item });
    toast.success(`${item.title.substring(0, 30)}... added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const addToWishlist = (item, index) => {
    dispatch({ type: "Add_Hart", product: item });
    changeBG(index);
    toast.success(`${item.title.substring(0, 30)}... added to wishlist!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(product.length / productsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  if (loading) {
    return (
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500">Error loading products.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Shop
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {currentProducts.map((e, index) => (
            <ProductCard
              key={e.id}
              item={e}
              isWishlisted={stat[index]}
              onAddToCart={() => addToCart(e)}
              onAddToWishlist={() => addToWishlist(e, index)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo(0, 0);
            }}
          />
        )}
      </div>
    </section>
  );
}
