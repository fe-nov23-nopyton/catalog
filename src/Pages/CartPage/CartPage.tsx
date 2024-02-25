// import { Loader } from "../../Components/Loader";
import { CartList } from "../../Components/CartList/CartList";
import { CheckoutSummary } from "../../Components/СheckoutSummary";
import { useAppSelector } from "../../redux/hooks";
import { totalQuantity } from "../../utils/totalQuantity";
import { useEffect } from "react";
import "./CartPage.scss";
import { Item } from "../../types/Item";

export const CartPage = () => {
  const items: Item[] = useAppSelector((state) => state.cart.cart);

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
      {/* Back button */}
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
