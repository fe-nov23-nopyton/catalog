import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { Breadcrumbs } from "../../Components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";
import { LookingGuy } from "../../Components/LookingGuy/LookingGuy";
import { useTranslation } from "react-i18next";

export const FavoritesPage: React.FC = () => {
  const items = useAppSelector((state) => state.favorites.favorites);
  const { t } = useTranslation();

  const itemsCount = items.length;

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(items));
  }, [items]);

  const location = useLocation();
  const path = location.pathname;

  return (
    <main className="favorites">
      <Breadcrumbs path={path} />

      {!!itemsCount ? (
        <>
          <h1 className="title" style={{ marginBottom: "8px" }}>
            {t("favoritesPage.title")}
          </h1>

          <div className="total-phones">
            {itemsCount} {t("favoritesPage.items")}
          </div>

          <ProductsList phones={items} />
        </>
      ) : (
        <div className="position-center">
          <LookingGuy mainMessage={t("lookingGuy.noProducts")} secondMessage={t("lookingGuy.didNotLike")} />
        </div>
      )}
    </main>
  );
};
