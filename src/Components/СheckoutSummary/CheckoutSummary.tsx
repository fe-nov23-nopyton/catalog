import React, { useState } from "react";
import "./CheckoutSummary.scss";
import { Button } from "../UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";
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
      <div className="checkout-button">
        <Button buttonType={ButtonType.Primary} buttonText="Checkout" handleClick={() => setIsModalOpen(true)} />
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
};
