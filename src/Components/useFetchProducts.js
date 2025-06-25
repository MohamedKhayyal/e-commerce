import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchProducts(url, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    axios.get(url, options)
      .then(res => {
        if (isMounted) setData(res.data);
      })
      .catch(err => {
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
} 