import React, { useState } from "react";
import "./CheckoutSummary.scss";
import { Button } from "../UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";
import { Modal } from "../Modal/Modal";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCartItems } from "../../redux/features/cartSlice";
import { useTranslation } from "react-i18next";

interface Props {
  totalPrice: number;
  itemsCount: number;
}

export const CheckoutSummary: React.FC<Props> = ({ totalPrice, itemsCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClear = () => {
    localStorage.removeItem("cart");
    dispatch(deleteCartItems());
  };

  return (
    <div className="checkout-summary">
      <span className="total-price">${totalPrice}</span>
      <div className="total-items">
        {t("cartPage.checkoutSummary.totalFor")} {itemsCount} {t("cartPage.checkoutSummary.items")}
      </div>
      <div className="divider" />
      <div className="checkout-button">
        <Button
          buttonType={ButtonType.Primary}
          buttonText={t("cartPage.checkout")}
          handleClick={() => setIsModalOpen(true)}
        />
        <Button handleClick={handleClear} buttonType={ButtonType.Primary} buttonText={t("cartPage.clearCart")} />
      </div>
      {isModalOpen && <Modal />}
    </div>
  );
};
