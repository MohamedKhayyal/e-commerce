import { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import FormInput from "./FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditProduct({ product, onProductUpdated }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ ...product });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "Products", product.id), {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      onProductUpdated({ ...form, id: product.id });
      setShow(false);
    } catch (err) {
      alert("Failed to update product");
    }
    setLoading(false);
  };

  return (
    <span>
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded font-semibold mr-2"
        onClick={() => setShow(true)}
      >
        Edit
      </button>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
              onClick={() => setShow(false)}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="md:col-span-2 mb-2">
              <h2 className="text-2xl font-bold text-yellow-600 mb-2">
                Edit Product
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Update the details below and save your changes.
              </p>
            </div>
            <FormInput
              label="Title"
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
            />
            <FormInput
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: e.target.value }))
              }
              required
            />
            <FormInput
              label="Image URL"
              name="image"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
              required
            />
            <FormInput
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm((f) => ({ ...f, stock: e.target.value }))
              }
              required
            />
            <div className="md:col-span-2">
              <FormInput
                label="Description"
                name="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                required
              />
            </div>
            <div className="md:col-span-2 flex gap-4 mt-2 justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-2 rounded-lg font-semibold transition-all duration-200"
                onClick={() => setShow(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </span>
  );
}
