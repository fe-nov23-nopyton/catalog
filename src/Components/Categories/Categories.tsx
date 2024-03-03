import React from "react";
import { Link } from "react-router-dom";

import "./Categories.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const categories = [
    { name: t("categories.phones"), amount: amountPhones, link: "phones", cssClass: "phones" },
    { name: t("categories.tablets"), amount: amountTablets, link: "tablets", cssClass: "tablets" },
    { name: t("categories.accessories"), amount: amountAccessories, link: "accessories", cssClass: "accessories" }
  ];

  return (
    <section className="container">
      <h2 className="category-title">{t("categories.title")}</h2>

      <div className="wrapper wrapper-categories">
        {categories.map((category) => (
          <article className="box" key={category.link}>
            <div className={`image-container ${category.cssClass}`}>
              <Link className="label" to={`/catalog/${category.link}`} />
            </div>

            <Link to={`/catalog/${category.link}`} className="category-name">
              {category.name}
            </Link>
            <span className="amount">
              {category.amount} {t("categories.models")}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};
