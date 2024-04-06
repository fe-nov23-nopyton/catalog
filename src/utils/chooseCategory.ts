export function chooseCategory(category: string) {
  switch (category) {
    case "phones":
      return "amountPhones";
    case "tablets":
      return "amountTablets";
    case "accessories":
      return "amountAccessories";
    default:
      return "amountPhones";
  }
}
