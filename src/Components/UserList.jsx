import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getDocs(query(collection(db, "Users"), orderBy("name"))).then(
      (querySnapshot) => {
        setUsers(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      }
    );
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required");
      return;
    }
    setAddLoading(true);
    try {
      const docRef = await addDoc(collection(db, "Users"), {
        name: form.name,
        email: form.email,
        createdAt: new Date(),
      });
      setUsers((prev) => [
        { id: docRef.id, name: form.name, email: form.email },
        ...prev,
      ]);
      setForm({ name: "", email: "" });
      setShowAdd(false);
      toast.success("User added successfully!");
    } catch (err) {
      setError("Failed to add user");
      toast.error("Failed to add user");
    }
    setAddLoading(false);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeleteLoading(id);
    try {
      await deleteDoc(doc(db, "Users", id));
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user");
    }
    setDeleteLoading("");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-0">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Manage Users</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 placeholder-gray-500 text-sm sm:text-base"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
          </div>
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold shadow hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 text-sm sm:text-base min-w-[110px]"
            onClick={() => setShowAdd(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>
      </div>
      {showAdd && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 px-2 sm:px-0">
          <form
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md flex flex-col gap-4 animate-fade-in"
            onSubmit={handleAddUser}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-2">Add User</h3>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base"
              required
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 text-sm sm:text-base"
                onClick={() => setShowAdd(false)}
                disabled={addLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all duration-200 text-sm sm:text-base"
                disabled={addLoading}
              >
                {addLoading ? "Adding..." : "Add User"}
              </button>
            </div>
          </form>
        </div>
      )}
      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No users found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white rounded-xl shadow border border-gray-100 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-all duration-150"
                >
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900 max-w-[120px] sm:max-w-none truncate">
                    {user.name}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-700 max-w-[160px] sm:max-w-none truncate">
                    {user.email}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1 text-xs sm:text-sm"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deleteLoading === user.id}
                      title="Delete user"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {deleteLoading === user.id ? "Deleting..." : "Delete"}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
