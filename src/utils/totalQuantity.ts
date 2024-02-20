import { CartItem } from "../types/CartItem";

export function totalQuantity(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
