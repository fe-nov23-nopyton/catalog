import { CartList } from "../../Components/CartList/CartList";
import { CheckoutSummary } from "../../Components/СheckoutSummary";
import { Item } from "../../types/Item";
import "./CartPage.scss";

export const CartPage = () => {
  console.log("CartPage");

  const items: Item[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: "Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)",
        price: 799.99,
        image: "https://picsum.photos/200/300"
      },
      quantity: 1
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)",
        price: 699.99,
        image: "https://picsum.photos/200/300"
      },
      quantity: 1
    },
    {
      id: 3,
      product: {
        id: 3,
        name: "Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)",
        price: 599.99,
        image: "https://picsum.photos/200/300"
      },
      quantity: 1
    }
  ];

  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce((acc, item) => {
    const price = item.product.price * item.quantity;
    return acc + Math.round(price);
  }, 0);

  return (
    <main className="cart">
      <h1 className="title">Cart</h1>
      {/* <!-- button back --> */}

      <div className="cart-wrapper">
        <CartList items={items} />
        <CheckoutSummary totalPrice={totalPrice} itemsCount={itemsCount} />
      </div>
    </main>
  );
};
