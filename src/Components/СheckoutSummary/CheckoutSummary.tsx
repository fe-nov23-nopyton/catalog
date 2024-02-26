import React, { useState } from "react";
import "./CheckoutSummary.scss";
import { Modal } from "../Modal/Modal";

interface Props {
  totalPrice: number;
  itemsCount: number;
}

export const CheckoutSummary: React.FC<Props> = ({ totalPrice, itemsCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="checkout-summary">
      <span className="total-price">${totalPrice}</span>
      <div className="total-items">Total for {itemsCount} items</div>
      <div className="divider" />
      <button type="button" className="checkout-button" onClick={() => setIsModalOpen(true)}>
        Checkout
      </button>
      {isModalOpen && <Modal />}
    </div>
  );
};
