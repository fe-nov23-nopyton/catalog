import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { useAppDispatch } from "../../redux/hooks";
import { setFavorites } from "../../redux/features/favoritesSlice";
import { Breadcrumbs } from "../../Components/Breadcrumbs/Breadcrumbs";
import { useLocation } from "react-router-dom";

export const FavoritesPage: React.FC = () => {
  const items = useAppSelector((state) => state.favorites.favorites);
  const dispatch = useAppDispatch();

  const itemsCount = items.length;

  useEffect(() => {
    const savedFavoritesState = localStorage.getItem("favorites");
    if (savedFavoritesState) {
      const cartState = JSON.parse(savedFavoritesState);
      dispatch(setFavorites(cartState));
    }
  }, []);

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
        <h1 className="empty-cart">Favorites is empty</h1>
      )}

      {/* {<Loader />} <!-- loading && (...) --> */}
    </main>
  );
};
