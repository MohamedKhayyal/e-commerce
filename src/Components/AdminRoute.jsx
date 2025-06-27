import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useAuth from "./useAuth";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null); // null means unknown
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setAdminLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "admins", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setIsAdmin(false);
      }
      setAdminLoading(false);
    };

    if (!loading) {
      checkAdminRole();
    }
  }, [user, loading]);

  if (loading || adminLoading || isAdmin === null) {
    return <p>Checking admin access...</p>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
