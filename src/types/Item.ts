export interface Item {
  id: number;
  quantity: number;
  product: {
    id: number;
    price: number;
    image: string;
    name: string;
  }; // replace with Product type
}
