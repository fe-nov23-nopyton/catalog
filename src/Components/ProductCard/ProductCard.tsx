/* eslint-disable prettier/prettier */
import React from "react";
import { Phone } from "../../types/Phone";

interface Props {
  phone: Phone;
}

export const ProductCard: React.FC<Props> = ({ phone }) => {
  console.log("ProductCard");

  return (
    <div className="card">
      <img
        src={phone.image}
        alt={phone.name} 
      />
      <div className="detailsCard">
        <h2>{phone.name}</h2>
        <span>{phone.price}</span>
        <p>Screen: <span>{phone.screen}</span></p>
        <p>Capacity: <span>{phone.capacity}</span></p>
        <p>RAM: <span>{phone.ram}</span></p>
      </div>

      <div className="buttons">
        <button type="button"> 
          Add to Cart
        </button>

        <button type="button">
          Add to favorites
        </button>
      </div>
    </div>
  );
};