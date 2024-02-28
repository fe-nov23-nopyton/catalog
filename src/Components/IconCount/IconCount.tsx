import React from "react";
import { Phone } from "../../types/Phone";
import { totalQuantity } from "../../utils/totalQuantity";
import { Item } from "../../types/Item";

import "./IconCount.scss";

interface Props {
  items: Phone[] | Item[];
}

const IconCount: React.FC<Props> = ({ items }) => {
  const total = items.length > 0 && "quantity" in items[0] ? totalQuantity(items as Item[]) : items.length;

  return total > 0 ? <div className="count-items">{total}</div> : null;
};

export default IconCount;
