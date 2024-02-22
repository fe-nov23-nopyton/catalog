/* eslint-disable prettier/prettier */
import React from "react";
import { Phone } from "../../types/Phone";

import "./ProductCard.scss";
import { HeartLikeIcon } from "../../images/icons";

interface Props {
  phone: Phone;
}

export const ProductCard: React.FC<Props> = ({ phone }) => {
  console.log(phone);
  return (
    <div className="card">
      <div className="card__image-container">
        <img className="card__image" src={`/catalog/new/${phone.image}`} alt={phone.name} />
      </div>
      <div className="card__details">
        <h2 className="card__details-name">{phone.name}</h2>

        <div className="card__price">
          <p className="card__price--actual">${phone.price}</p>
          <p className="card__price--old">${phone.price}</p>
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
        <button className="card__buttons-add-to-cart" type="button">
          Add to cart
        </button>

        <HeartLikeIcon />
      </div>
    </div>
  );
};
