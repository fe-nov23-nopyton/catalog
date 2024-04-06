/* eslint-disable arrow-body-style */
import React from "react";
import { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";

interface Props {
  phones: Product[];
}

export const ProductsList: React.FC<Props> = ({ phones }) => {
  return (
    <main className="grid grid-item">
      {phones.map((phone) => (
        <ProductCard key={phone.id} product={phone} />
      ))}
    </main>
  );
};
