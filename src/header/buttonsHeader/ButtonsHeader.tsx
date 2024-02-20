import { Link } from "react-router-dom";
import "./buttonsHeader.scss";
import CartIconWithQuantity from "../../Components/CartIconWithQuantity/CartIconWithQuantity";

export const ButtonsHeader = () => (
  <>
    <Link className="buttons_header" to={"/favorite"}>
      <div className="icon-favorite" />
    </Link>
    <Link className="buttons_header" to={"/cart"}>
      <CartIconWithQuantity />
    </Link>
  </>
);
