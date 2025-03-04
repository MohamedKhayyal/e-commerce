import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
export default function Wishlist() {
  const { wishlist, dispatch } = useContext(cartContext);

  return (
    <div className="contain">
      <div className="cartLink d-flex align-items-center justify-content-between">
        <p>Wishlist ({wishlist.length})</p>
        <Link to={"/home"} className="cart-btn">
          Move All To Bag
        </Link>
      </div>
      <div className="month-product d-flex align-items-center flex-wrap pt-5">
        {wishlist.length > 0 ? (
          wishlist.map((e) => (
            <div className="box" key={e.id} style={{ height: "450px" }}>
              <div className="box-image">
                <img
                  src={e.image}
                  alt={e.title}
                  className="object-fit-contain p-2"
                />
                <div className="box-icon">
                  <button
                    className="hov"
                    onClick={() =>
                      dispatch({ type: "RemoveFromWishlist", product: e })
                    }
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="icon" />
                  </button>
                </div>
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
    </div>
  );
}
