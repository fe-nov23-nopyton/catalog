import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { totalQuantity } from "../../utils/totalQuantity";
import { Item } from "../../types/Item";
import { CartList } from "../../Components/CartList/CartList";
import { CheckoutSummary } from "../../Components/СheckoutSummary";
import { Button } from "../../Components/UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";
import { LookingGuy } from "../../Components/LookingGuy/LookingGuy";

import "./CartPage.scss";
import { useTranslation } from "react-i18next";

export const CartPage = () => {
  const items: Item[] = useAppSelector((state) => state.cart.cart);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const itemsCount = totalQuantity(items);

  const totalPrice = items.reduce((acc, item) => {
    const price = item.product.price * item.quantity;

    return acc + Math.round(price);
  }, 0);

  return (
    <main className="cart">
      <div style={{ textAlign: "left" }}>
        <Button handleClick={handleBack} buttonType={ButtonType.Navigation} buttonText={t("navigate.back")} />
      </div>
      {!!itemsCount ? (
        <h1 className="title">{t("cartPage.title")}</h1>
      ) : (
        <div className="position-center">
          <LookingGuy mainMessage={t("lookingGuy.noProducts")} secondMessage={t("lookingGuy.youCanAdd")} />
        </div>
      )}
      {!!itemsCount && (
        <div className="cart-wrapper">
          <CartList items={items} />
          <CheckoutSummary totalPrice={totalPrice} itemsCount={itemsCount} />
        </div>
      )}
    </main>
  );
};
