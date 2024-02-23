import { Phone } from "../types/Phone";

export const getHotPrices = (phones: Phone[]) => {
  const hotPrices = phones?.filter((phone) => phone.fullPrice > 800).sort((a, b) => b.fullPrice - a.fullPrice);
  return hotPrices;
};
