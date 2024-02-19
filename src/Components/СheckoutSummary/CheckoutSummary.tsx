import React, { useState } from "react";
import "./CheckoutSummary.scss";
import classNames from "classnames";

interface Props {
  totalPrice: number;
  itemsCount: number;
}

export const CheckoutSummary: React.FC<Props> = ({ totalPrice, itemsCount }) => {
  console.log("CheckoutSummary");

  const [isShowMessage, setIsShowMessage] = useState(false);

  const handleCheckout = () => {
    setIsShowMessage(true);

    const timer = setTimeout(() => {
      setIsShowMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className="checkout-summary">
      <span className="total-price">${totalPrice}</span>
      <div className="total-items">Total for {itemsCount} items</div>
      <div className="divider" />
      <button className={classNames("checkout-button", { isFocus: isShowMessage })} onClick={handleCheckout}>
        Checkout
      </button>

      {isShowMessage && <p>We are sorry, but this feature is not implemented yet</p>}
    </div>
  );
};
