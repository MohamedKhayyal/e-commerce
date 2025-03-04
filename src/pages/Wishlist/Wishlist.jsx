import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";

export default function Wishlist() {
  const { hart, dispatch } = useContext(cartContext);

  return (
    <div className="month-product d-flex align-items-center flex-wrap p-5">
      {hart.length > 0 ? (
        hart.map((e) => (
          <div className="box" key={e.id} style={{ height: "450px" }}>
            <div className="box-image">
              <img
                src={e.image}
                alt={e.title}
                className="object-fit-contain p-2"
              />
            </div>
            <div className="box-body">
              <div className="link">
                <Link onClick={() => dispatch({ type: "Add", product: e })}>
                  Add to cart
                </Link>
              </div>
              <div className="title" style={{ width: "300px" }}>
                <p>{e.title}</p>
              </div>
              <div className="price">
                <p>{e.price}$</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}
