import React from "react";
import { addQuantity, deleteFromCart, subtractQuantity } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import "../../Pages/CartPage/CartPage.scss";
import { Item } from "../../types/Item";

interface Props {
  item: Item;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteFromCart(item));
  };

  const handleChangeQuantity = (action: string) => {
    action === "+" ? dispatch(addQuantity(item)) : dispatch(subtractQuantity(item));
  };

  return (
    <div className="cart-item">
      <div className="wrapper">
        <button className="remove" onClick={handleDeleteItem} />

        <img src={item.product.image} alt={item.product.name} />

        <h2>{item.product.name}</h2>
      </div>

      <div className="wrapper">
        <div className="quantity">
          <button onClick={() => handleChangeQuantity("-")}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleChangeQuantity("+")}>+</button>
        </div>

        <p className="price">${item.product.price}</p>
      </div>
    </div>
  );
};
