import React from "react";
import { Phone } from "../../types/Phone";
import { ProductCard } from "../ProductCard/ProductCard";

interface Props {
  phones: Phone[];
}

export const ProductsList: React.FC<Props> = ({ phones }) => {
  console.log(phones);

  return (
    <main className="grid grid-item">
      {phones.map((phone) => (
        <ProductCard key={phone.id} phone={phone} />
      ))}
    </main>
  );
};
