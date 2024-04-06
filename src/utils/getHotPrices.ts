import { Product } from "../types/Product";

export const getHotPrices = (phones: Product[]) => {
  const hotPrices = phones?.filter((phone) => phone.fullPrice > 800).sort((a, b) => b.fullPrice - a.fullPrice);
  return hotPrices;
};
