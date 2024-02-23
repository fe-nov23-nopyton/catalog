import { Item } from "../types/Item";

export function totalQuantity(items: Item[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
