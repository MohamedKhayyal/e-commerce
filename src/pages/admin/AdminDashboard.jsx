import { useState } from "react";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  const fetchAndUpload = async () => {
    setLoading(true);
    try {
      const [fakeStoreRes, dummyJsonRes] = await Promise.all([
        fetch("https://fakestoreapi.com/products"),
        fetch("https://dummyjson.com/products"),
      ]);

      const fakeStoreData = await fakeStoreRes.json();
      const dummyJsonData = await dummyJsonRes.json();

      const fakeStoreProducts = fakeStoreData.map((item) => ({
        id: `fake-${item.id}`,
        title: item.title,
        price: item.price,
        image: item.image,
        rating: item.rating?.rate,
        stock: item.rating?.count,
        description: item.description || "",
        source: "fakestore",
      }));

      const dummyJsonProducts = (dummyJsonData.products || []).map((item) => ({
        id: `dummy-${item.id}`,
        title: item.title,
        price: item.price,
        image: item.thumbnail,
        rating: item.rating,
        stock: item.stock,
        description: item.description || "",
        source: "dummyjson",
      }));

      const allProducts = [...fakeStoreProducts, ...dummyJsonProducts];
      const productsCol = collection(db, "Products");

      for (const product of allProducts) {
        await setDoc(doc(productsCol, product.id), product);
      }

      toast.success("✅ تم استيراد كل المنتجات بنجاح");
    } catch (err) {
      toast.error("❌ فشل في رفع المنتجات");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">لوحة تحكم الأدمن</h2>
      <button
        onClick={fetchAndUpload}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        {loading ? "جارٍ التحميل..." : "استيراد المنتجات من API"}
      </button>
    </div>
  );
}
