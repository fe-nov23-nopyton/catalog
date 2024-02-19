import { Link } from "react-router-dom";
import "./buttonsHeader.css";

export const ButtonsHeader = () => (
  <>
    <Link className="buttons_header" to={"/favorite"}>
      <div className="icon-favorite" />
    </Link>
    <Link className="buttons_header" to={"/cart"}>
      <div className="icon-cart" />
    </Link>
  </>
);
