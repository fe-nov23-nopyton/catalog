import React from "react";
import { Phone } from "../../types/Phone";
import { totalQuantity } from "../../utils/totalQuantity";
import "./IconCount.scss";
import { CartItem } from "../../types/CartItem";

interface Props {
  items: Phone[] | CartItem[];
}

const IconCount: React.FC<Props> = ({ items }) => {
  let total = 0;

  if (items.length > 0) {
    if ("quantity" in items[0]) {
      total = totalQuantity(items as CartItem[]);
    } else {
      total = items.length;
    }
  }

  return total > 0 ? <div className="count-items">{total}</div> : null;
};

export default IconCount;
