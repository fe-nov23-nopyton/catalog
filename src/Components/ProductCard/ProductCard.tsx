import React from "react";
import { Phone } from "../../types/Phone";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clickFavorite } from "../../redux/features/favoritesSlice";
import { addToCart, deleteFromCart } from "../../redux/features/cartSlice";
import { Button } from "../UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";

import "./ProductCard.scss";
import { useTranslation } from "react-i18next";

interface Props {
  phone: Phone;
}

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const { t } = useTranslation();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  const hasFavoriteItem = favorites.some((item) => item.phoneId === phone.phoneId);
  const hasCartItem = cart.some((item) => item.id === phone.phoneId);

  const handleFavorite = () => {
    dispatch(clickFavorite(phone));
  };

  const handleToggleCart = () => {
    const cartItem = {
      id: phone.phoneId,
      quantity: 1,
      product: phone
    };

    if (hasCartItem) {
      dispatch(deleteFromCart(cartItem));
    } else {
      dispatch(addToCart(cartItem));
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      localStorage.setItem("cart", JSON.stringify([...cartItems, cartItem]));
    }
  };

  return (
    <div className="card">
      <Link to={`/catalog/phones/${phone.itemId}`} className="card__link">
        <div className="card__image-container">
          <img className="card__image" src={`/catalog/new/${phone.image}`} alt={phone.name} />
        </div>
      </Link>

      <div className="card__details">
        <Link to={`/catalog/phones/${phone.itemId}`} className="card__link">
          <h2 className="card__details-name">{phone.name}</h2>
        </Link>

        <div className="card__price">
          <p className="card__price--actual">${phone.price}</p>
          <p className="card__price--old">${phone.fullPrice}</p>
        </div>

        <div className="card__feature">
          <p className="card__feature-name">{t("product.screen")}:</p>

          <p className="card__feature-value">{phone.screen}</p>
        </div>
        <div className="card__feature">
          <p className="card__feature-name">{t("product.capacity")}:</p>

          <p className="card__feature-value">{phone.capacity}</p>
        </div>
        <div className="card__feature">
          <p className="card__feature-name">{t("product.ram")}</p>

          <p className="card__feature-value">{phone.ram}</p>
        </div>
      </div>

      <div className="card__buttons">
        <Button
          handleClick={handleToggleCart}
          buttonType={ButtonType.Primary}
          buttonText={t("button.addToCart")}
          isSelected={hasCartItem}
        />

        <Icon handleClick={handleFavorite} iconType={IconContent.Favorites} isSelected={hasFavoriteItem} />
      </div>
    </div>
  );
};
