import { Phone } from "../types/Phone";

export function paginateArray(array: Phone[], currentPage: number, itemsOnPage: number) {
  const startIndex = currentPage * itemsOnPage;
  const endIndex = startIndex + itemsOnPage;

  return array.slice(startIndex, endIndex);
}
