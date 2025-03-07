import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProducts] = useState({});
  let parm = useParams();
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${parm.id}`).then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <div>
      <div className="details-container d-flex">
        <div className="products-image">
          <img src={product.image} className="object-fit-contain p-2" />
        </div>
        <div className="product-details">
        <h3>{product?.title ? product.title.slice(0, 50) + (product.title.length > 10 ? "..." : "") : ""}</h3>
        </div>
      </div>
    </div>
  );
}
