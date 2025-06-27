import { useState } from "react";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import FormInput from "./FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function AddProduct({ onProductAdded, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    stock: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "Products"), {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      const newDoc = await getDoc(docRef);
      onProductAdded({ id: newDoc.id, ...newDoc.data() });
      setForm({ title: "", price: "", image: "", stock: "", description: "" });
      if (onCancel) onCancel();
    } catch (err) {
      alert("Failed to add product");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in"
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onCancel}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="md:col-span-2 mb-2">
          <h2 className="text-2xl font-bold text-primary-700 mb-2">Add Product</h2>
          <p className="text-gray-500 text-sm mb-2">Fill in the details below to add a new product.</p>
        </div>
        <FormInput
          label="Title"
          name="title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
        <FormInput
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          required
        />
        <FormInput
          label="Image URL"
          name="image"
          value={form.image}
          onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          required
        />
        <FormInput
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
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
            className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-2 rounded-lg font-semibold transition-all duration-200"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
