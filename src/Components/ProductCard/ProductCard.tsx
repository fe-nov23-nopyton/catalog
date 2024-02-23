/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from "react";
import { Phone } from "../../types/Phone";

import "./ProductCard.scss";
import { HeartLikeIcon } from "../../images/icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clickFavorite } from "../../redux/features/favoritesSlice";
import { addToCart } from "../../redux/features/cartSlice";

interface Props {
  phone: Phone;
}

export const ProductCard: React.FC<Props> = ({ phone }) => {
  // const favorites = useAppSelector((state) => state.favorites.favorites);
  const dispatch = useAppDispatch();

  // const hasFavoriteItem = favorites.some((item) => item.id === phone.id);

  const handleFavorite = () => {
    dispatch(clickFavorite(phone));
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: phone.id,
      quantity: 1,
      product: phone
    };

    dispatch(addToCart(cartItem));
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
          <p className="card__feature-name">Screen:</p>

          <p className="card__feature-value">{phone.screen}</p>
        </div>
        <div className="card__feature">
          <p className="card__feature-name">Capacity:</p>

          <p className="card__feature-value">{phone.capacity}</p>
        </div>
        <div className="card__feature">
          <p className="card__feature-name">Ram</p>

          <p className="card__feature-value">{phone.ram}</p>
        </div>
      </div>

      <div className="card__buttons">
        <button onClick={handleAddToCart} className="card__buttons-add-to-cart" type="button">
          Add to cart
        </button>

        <HeartLikeIcon onSelect={handleFavorite} />
      </div>
    </div>
  );
};
