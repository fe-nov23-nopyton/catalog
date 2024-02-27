import React from "react";
import { addQuantity, deleteFromCart, subtractQuantity } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import "../../Pages/CartPage/CartPage.scss";
import { Item } from "../../types/Item";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";

interface Props {
  item: Item;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const normalizedUrl = `/catalog/new/${item.product.image}`;

  const handleDeleteItem = () => {
    dispatch(deleteFromCart(item));
  };

  const handleChangeQuantity = (action: string) => {
    action === "+" ? dispatch(addQuantity(item)) : dispatch(subtractQuantity(item));
  };

  return (
    <div className="cart-item">
      <div className="cart-item--wrapper">
        <button className="cart-item--remove" onClick={handleDeleteItem} />

        <img className="cart-item--image" src={normalizedUrl} alt={item.product.name} />

        <h2 className="cart-item--title">{item.product.name}</h2>
      </div>

      <div className="cart-item--wrapper cart-item--wrapper-amount">
        <div className="cart-item--quantity">
          <Icon
            iconType={IconContent.Text}
            handleClick={() => handleChangeQuantity("-")}
            content="-"
            isDisabled={item.quantity === 1}
          />
          <span className="cart-item--quantity-value">{item.quantity}</span>
          <Icon iconType={IconContent.Text} handleClick={() => handleChangeQuantity("+")} content="+" />
        </div>

        <p className="price">${item.product.price}</p>
      </div>
    </div>
  );
};
