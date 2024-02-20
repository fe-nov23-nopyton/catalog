import { useAppSelector } from "../../redux/hooks";
import { totalQuantity } from "../../utils/totalQuantity";
import "./CartIconWithQuantity.scss";

const CartIconWithQuantity = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const total = totalQuantity(cart);

  return <div className="icon-cart">{total > 0 && <div className="cart-quantity">{total}</div>}</div>;
};

export default CartIconWithQuantity;
