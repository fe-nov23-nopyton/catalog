import { Product } from "../types/Product";
import { getCategoryNameById } from "./getCategoryNameById";

export const selectProducts = (
  currentCategory: number,
  phones: Product[],
  tablets: Product[],
  accessories: Product[]
) => {
  switch (getCategoryNameById(currentCategory)) {
    case "phones":
      return phones;
    case "tablets":
      return tablets;
    case "accessories":
      return accessories;
    default:
      return phones;
  }
};
