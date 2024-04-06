export function getCategoryNameById(id: number) {
  switch (id) {
    case 1:
      return "phones";
    case 2:
      return "tablets";
    case 3:
      return "accessories";
    default:
      return "phones";
  }
}
