import { useState, useEffect } from "react";
import AddProduct from "../../Components/AddProduct";
import EditProduct from "../../Components/EditProduct";
import UserList from "../../Components/UserList";
import { db } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faUsers,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (tab !== "products") return;
    setLoading(true);
    getDocs(collection(db, "Products")).then((querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });
  }, [tab]);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setDeleteLoading(id);
    try {
      await deleteDoc(doc(db, "Products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
    setDeleteLoading("");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10">
      <div className="flex flex-row max-w-7xl mx-auto min-h-screen gap-4">
        {/* Sidebar */}
        <aside className="sticky top-0 h-screen flex flex-col items-center md:items-stretch w-16 md:w-72 bg-white border-r border-gray-100 shadow-soft flex-shrink-0 py-4 md:py-0 z-20 transition-all duration-300">
          {/* Logo/Title for md+ */}
          <div className="hidden md:flex flex-col p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-primary-700 mb-1">Admin</h2>
            <p className="text-sm text-gray-400">Dashboard</p>
          </div>
          <nav className="flex flex-col gap-2 p-0 md:p-4 w-full items-center md:items-stretch mt-2 md:mt-0">
            <button
              className={`group flex flex-col md:flex-row items-center justify-center md:justify-start gap-0 md:gap-3 text-left px-0 md:px-4 py-3 rounded-lg font-semibold transition-all duration-200 w-12 h-12 md:w-auto md:h-auto focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                tab === "products"
                  ? "bg-primary-50 text-primary-700 shadow"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setTab("products")}
              title="Products"
            >
              <span className="flex items-center justify-center w-12 h-12 md:w-6 md:h-6">
                <FontAwesomeIcon icon={faBoxOpen} className="w-6 h-6 mx-auto" />
              </span>
              <span className="hidden md:inline ml-2">Products</span>
            </button>
            <button
              className={`group flex flex-col md:flex-row items-center justify-center md:justify-start gap-0 md:gap-3 text-left px-0 md:px-4 py-3 rounded-lg font-semibold transition-all duration-200 w-12 h-12 md:w-auto md:h-auto focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                tab === "users"
                  ? "bg-primary-50 text-primary-700 shadow"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setTab("users")}
              title="Users"
            >
              <span className="flex items-center justify-center w-12 h-12 md:w-6 md:h-6">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6 mx-auto" />
              </span>
              <span className="hidden md:inline ml-2">Users</span>
            </button>
            <button
              className="group flex flex-col md:flex-row items-center justify-center md:justify-start gap-0 md:gap-3 mt-6 px-0 md:px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 w-12 h-12 md:w-auto md:h-auto focus:outline-none focus:ring-2 focus:ring-primary-300"
              onClick={() => {
                setTab("products");
                setShowAdd(true);
              }}
              title="Add Product"
            >
              <span className="flex items-center justify-center w-12 h-12 md:w-6 md:h-6">
                <FontAwesomeIcon icon={faPlus} className="w-6 h-6 mx-auto" />
              </span>
              <span className="hidden md:inline ml-2">Add Product</span>
            </button>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 bg-white min-h-screen md:ml-0">
          {tab === "products" ? (
            <div>
              {showAdd && (
                <AddProduct
                  onProductAdded={(p) => {
                    setProducts((prev) => [p, ...prev]);
                    setShowAdd(false);
                  }}
                  onCancel={() => setShowAdd(false)}
                />
              )}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">Manage Products</h2>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 placeholder-gray-500"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                    />
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="text-center py-10 text-gray-400">
                  Loading products...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  No products found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl transition-all duration-200 border border-gray-100 relative animate-fade-in"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          loading="lazy"
                          src={product.image}
                          alt={product.title}
                          className="w-20 h-20 object-contain rounded-xl border bg-gray-50"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {product.description?.slice(0, 60)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xl font-bold text-primary-700">
                          ${product.price}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-50 text-primary-700">
                          Stock: {product.stock}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4 justify-end">
                        <EditProduct
                          product={product}
                          onProductUpdated={(updated) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p.id === updated.id ? updated : p
                              )
                            )
                          }
                        />
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={deleteLoading === product.id}
                        >
                          {deleteLoading === product.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <UserList />
          )}
        </main>
      </div>
    </section>
  );
}
