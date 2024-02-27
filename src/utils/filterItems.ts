/* eslint-disable arrow-body-style */
import { Phone } from "../types/Phone";

export const filterItems = (items: Phone[], query: string) => {
  return items.filter((item) => item.name.toLowerCase().trim().includes(query.toLowerCase().trim()));
};
