import React from "react";
import { Link } from "react-router-dom";

import "./Categories.scss";

interface AmountItems {
  amountPhones: number;
  amountTablets: number;
  amountAccessories: number;
}

interface Props {
  amount: AmountItems;
}

export const Categories: React.FC<Props> = ({ amount }) => {
  const { amountPhones, amountTablets, amountAccessories } = amount;

  const categories = [
    { name: "Mobile phones", amount: amountPhones, link: "phones", cssClass: "phones" },
    { name: "Tablets", amount: amountTablets, link: "tablets", cssClass: "tablets" },
    { name: "Accessories", amount: amountAccessories, link: "accessories", cssClass: "accessories" }
  ];

  return (
    <section className="container">
      <h2 className="category-title">Shop by category</h2>

      <div className="wrapper wrapper-categories">
        {categories.map((category) => (
          <article className="box" key={category.link}>
            <div className={`image-container ${category.cssClass}`}>
              <Link className="label" to={`/catalog/${category.link}`} />
            </div>

            <Link to={`/catalog/${category.link}`} className="category-name">
              {category.name}
            </Link>
            <span className="amount">{category.amount} models</span>
          </article>
        ))}
      </div>
    </section>
  );
};
