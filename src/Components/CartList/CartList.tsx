import React from "react";
import { Item } from "../../types/Item";
import { CartItem } from "../CartItem";

interface Props {
  items: Item[];
}

export const CartList: React.FC<Props> = ({ items }) => (
  <div className="cart-items">
    {items.map((item) => (
      <CartItem item={item} key={item.id} />
    ))}
  </div>
);
