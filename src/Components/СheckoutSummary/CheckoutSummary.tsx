import React from "react";
import "./CheckoutSummary.scss";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCartItems } from "../../redux/features/cartSlice";
import { Button } from "../UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";

interface Props {
  totalPrice: number;
  itemsCount: number;
}

export const CheckoutSummary: React.FC<Props> = ({ totalPrice, itemsCount }) => {
  const dispatch = useAppDispatch();

  const handleCheckout = () => {
    const userConfirmation = window.confirm("Checkout is not implemented yet. Do you want to clear the Cart?");

    if (userConfirmation) {
      dispatch(deleteCartItems());
    }
  };

  return (
    <div className="checkout-summary">
      <span className="total-price">${totalPrice}</span>
      <div className="total-items">Total for {itemsCount} items</div>
      <div className="divider" />
      <div className="checkout-button">
        <Button buttonType={ButtonType.Primary} buttonText="Checkout" handleClick={handleCheckout} />
      </div>
    </div>
  );
};
