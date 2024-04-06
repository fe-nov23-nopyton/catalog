/* eslint-disable arrow-body-style */
import { Product } from "../types/Product";

export const filterItems = (items: Product[], query: string) => {
  return items.filter((item) => item.name.toLowerCase().trim().includes(query.toLowerCase().trim()));
};
