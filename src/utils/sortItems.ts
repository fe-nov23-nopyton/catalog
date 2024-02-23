import { Phone } from "../types/Phone";

export const sortItems = (phones: Phone[], criterion: string) =>
  [...phones].sort((a, b) => {
    switch (criterion) {
      case "Newest":
        return b.year - a.year;
      case "Alphabetically":
        return a.name.localeCompare(b.name);
      case "Cheapest":
        return a.price - b.price;
      default:
        return 0;
    }
  });
