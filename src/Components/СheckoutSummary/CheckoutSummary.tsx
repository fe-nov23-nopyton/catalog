import React, { useState } from "react";
import "./CheckoutSummary.scss";
import Modal from "../Modal/Modal";

interface Props {
  totalPrice: number;
  itemsCount: number;
}

export const CheckoutSummary: React.FC<Props> = ({ totalPrice, itemsCount }) => {
  // const dispatch = useAppDispatch();

  // const handleCheckout = () => {
  //   const userConfirmation = window.confirm("Checkout is not implemented yet. Do you want to clear the Cart?");

  //   if (userConfirmation) {
  //     dispatch(deleteCartItems());
  //   }
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="checkout-summary">
      <span className="total-price">${totalPrice}</span>
      <div className="total-items">Total for {itemsCount} items</div>
      <div className="divider" />
      <button className="checkout-button" onClick={() => setModalActive(true)}>
        Checkout
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        <h2 className="modal__title">Thank you for your purchase!</h2>
        <p className="modal__subtitle">We appreciate your purchase. Enjoy your products!</p>
        <a className="modal__button" href="/catalog/home">
          OK
        </a>
      </Modal>
    </div>
  );
};
