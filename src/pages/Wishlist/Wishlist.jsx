import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Feautres/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
export default function Wishlist() {
  const { wishlist, dispatch } = useContext(cartContext);

  const moveAllToCart = () => {
    wishlist.forEach((item) => {
      dispatch({ type: "Add", product: item }); // Add each item to the cart
    });
    dispatch({ type: "ClearWishlist" }); // Clear the wishlist
  };

  return (
    <div className="contain">
      <div className="cartLink d-flex align-items-center justify-content-between">
        <p>Wishlist ({wishlist.length})</p>
        {wishlist.length != 0 ? (
          <Link className="cart-btn" onClick={moveAllToCart}>
            Move All To Bag
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="month-product d-flex align-items-center flex-wrap pt-5">
        {wishlist.length > 0 ? (
          wishlist.map((e) => (
            <div className="box" key={e.id} style={{ height: "450px" }}>
              <div className="box-image">
                <Link to={`/product-details/${e.id}`}>
                  <img src={e.image} className="object-fit-contain p-2" />
                </Link>
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
