import { Phone } from "../types/Phone";

export const sortItems = (phones: Phone[], criterion: string) =>
  [...phones].sort((a, b) => {
    switch (criterion) {
      case "newest":
        return b.year - a.year;
      case "alphabetically":
        return a.name.localeCompare(b.name);
      case "cheapest":
        return a.price - b.price;
      default:
        return 0;
    }
  });
