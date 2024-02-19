import React from "react";
import { Phone } from "../../types/Phone";
import { ProductCard } from "../ProductCard/ProductCard";

interface Props {
  phones: Phone[];
}

export const ProductsList: React.FC<Props> = ({ phones }) => {
  console.log("ProductsList");

  return (
    <main className="grid">
      {phones.map((phone) => (
        <ProductCard key={phone.id} phone={phone} />
      ))}
    </main>
  );
};
