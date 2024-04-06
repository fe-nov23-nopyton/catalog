import React from "react";
import { addQuantity, deleteFromCart, subtractQuantity } from "../../redux/features/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Item } from "../../types/Item";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";

import "../../Pages/CartPage/CartPage.scss";
import { Link } from "react-router-dom";
import { changeImageFormat } from "../../utils/changeImageFormat";
import { getCategoryNameById } from "../../utils/getCategoryNameById";

interface Props {
  item: Item;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const currentProductUrl = `/catalog/${getCategoryNameById(item.product.categoryId)}/${item.id}`;
  const normalizedUrlImage = `/catalog/new/${changeImageFormat(item.product.images[0])}`;

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

        <Link to={currentProductUrl}>
          <img className="cart-item--image" src={normalizedUrlImage} alt={item.product.name} />
        </Link>

        <Link to={currentProductUrl}>
          <h2 className="cart-item--title">{item.product.name}</h2>
        </Link>
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
