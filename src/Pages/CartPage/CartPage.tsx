// import { Loader } from "../../Components/Loader";
import { CartList } from "../../Components/CartList/CartList";
import { CheckoutSummary } from "../../Components/СheckoutSummary";
import { useAppSelector } from "../../redux/hooks";
import { totalQuantity } from "../../utils/totalQuantity";
import { useEffect } from "react";
import "./CartPage.scss";
import { Item } from "../../types/Item";
import { Button } from "../../Components/UI_Kit/Button";
import { useNavigate } from "react-router";
import { ButtonType } from "../../types/ButtonType";

export const CartPage = () => {
  const items: Item[] = useAppSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const itemsCount = totalQuantity(items);

  const totalPrice = items.reduce((acc, item) => {
    const price = item.product.price * item.quantity;
    return acc + Math.round(price);
  }, 0);

  return (
    <main className="cart">
      <div style={{ textAlign: "left" }}>
        <Button handleClick={handleBack} buttonType={ButtonType.Navigation} buttonText="Back" />
      </div>
      {!!itemsCount ? <h1 className="title">Cart</h1> : <h1 className="title">Your cart is empty</h1>}
      {/* {<Loader />} <!-- loading && (...) --> */}
      {!!itemsCount && (
        <div className="cart-wrapper">
          <CartList items={items} />
          <CheckoutSummary totalPrice={totalPrice} itemsCount={itemsCount} />
        </div>
      )}
    </main>
  );
};
