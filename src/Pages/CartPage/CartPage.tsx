// import { Loader } from "../../Components/Loader";
import { CartList } from "../../Components/CartList/CartList";
import { CheckoutSummary } from "../../Components/СheckoutSummary";
import { CartItem } from "../../types/CartItem";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { totalQuantity } from "../../utils/totalQuantity";
import { useEffect } from "react";
import { setCart } from "../../redux/features/cartSlice";
import "./CartPage.scss";

export const CartPage = () => {
  const items: CartItem[] = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedCartState = localStorage.getItem("cart");
    if (savedCartState) {
      const cartState = JSON.parse(savedCartState);
      dispatch(setCart(cartState));
    }
  }, []);

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
