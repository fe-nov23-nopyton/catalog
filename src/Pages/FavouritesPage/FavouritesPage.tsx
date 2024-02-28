import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { Breadcrumbs } from "../../Components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";
import { LookingGuy } from "../../Components/LookingGuy/LookingGuy";

export const FavoritesPage: React.FC = () => {
  const items = useAppSelector((state) => state.favorites.favorites);

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
            Favorites
          </h1>
          <div className="total-phones">{itemsCount} items</div>

          <ProductsList phones={items} />
        </>
      ) : (
        <div className="position-center">
          <LookingGuy mainMessage="There are no products yet..." />
        </div>
      )}

      {/* {<Loader />} <!-- loading && (...) --> */}
    </main>
  );
};
