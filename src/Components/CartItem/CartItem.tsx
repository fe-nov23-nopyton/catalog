import React from "react";
import { Item } from "../../types/Item";
import "../../Pages/CartPage/CartPage.scss";

interface Props {
  item: Item;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  console.log("CartItem");
  return (
    <div className="cart-item">
      <div className="wrapper">
        <button className="remove">X</button>

        <img src={item.product.image} alt={item.product.name} />

        <h2>{item.product.name}</h2>
      </div>

      <div className="wrapper">
        <div className="quantity">
          <button>-</button>
          <span>{item.quantity}</span>
          <button>+</button>
        </div>

        <p className="price">${item.product.price}</p>
      </div>
    </div>
  );
};
