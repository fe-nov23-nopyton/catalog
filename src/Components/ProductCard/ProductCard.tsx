import React from "react";
import { Product } from "../../types/Product";
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
import { changeImageFormat } from "../../utils/changeImageFormat";
import { getCategoryNameById } from "../../utils/getCategoryNameById";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const currentCategory = getCategoryNameById(product.categoryId);

  const { t } = useTranslation();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  const hasFavoriteItem = favorites.some((item) => item.itemId === product.itemId);
  const hasCartItem = cart.some((item) => item.id === product.itemId);

  const imageProduct = `/catalog/new/${changeImageFormat(product.images[0])}`;

  const handleFavorite = () => {
    dispatch(clickFavorite(product));
  };

  const handleToggleCart = () => {
    const cartItem = {
      id: product.itemId,
      quantity: 1,
      product: product
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
      <Link to={`/catalog/${currentCategory}/${product.itemId}`} className="card__link">
        <div className="card__image-container">
          <img className="card__image" src={imageProduct} alt={product.name} />
        </div>
      </Link>

      <div className="card__details">
        <Link to={`/catalog/${currentCategory}/${product.itemId}`} className="card__link">
          <h2 className="card__details-name">{product.name}</h2>
        </Link>

        <div className="card__price">
          <p className="card__price--actual">${product.price}</p>
          <p className="card__price--old">${product.fullPrice}</p>
        </div>

        <div className="card__feature">
          <p className="card__feature-name">{t("product.screen")}:</p>

          <p className="card__feature-value">{product.screen}</p>
        </div>
        <div className="card__feature">
          <p className="card__feature-name">{t("product.capacity")}:</p>

          <p className="card__feature-value">{product.capacity}</p>
        </div>
        <div className="card__feature">
          <p className="card__feature-name">{t("product.ram")}</p>

          <p className="card__feature-value">{product.ram}</p>
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
