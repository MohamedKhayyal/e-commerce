import { Link } from "react-router-dom";
import "./index.scss";

export default function Notfound() {
  return (
    <div className="cart-container">
      <p>
        Home / <b>404 Error</b>
      </p>
      <div className="not-found">
        <h1>404 Not Found</h1>
        <p>Your visited page not found. You may go home page.</p>
      </div>
      <div className="go-home">
        <Link to={"/home"}>Back to home page</Link>
      </div>
    </div>
  );
}
