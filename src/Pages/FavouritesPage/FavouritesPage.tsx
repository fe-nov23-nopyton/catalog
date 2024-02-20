import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { useAppDispatch } from "../../redux/hooks";
import { setFavorites } from "../../redux/features/favoritesSlice";

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

  return (
    <main className="favorites">
      {/* breadcrumbs */}

      {!!itemsCount ? (
        <>
          <h1 className="title">Favorites</h1>
          <div className="total-phones">{itemsCount} items</div>
        </>
      ) : (
        <h1 className="empty-cart">Favorites is empty</h1>
      )}

      {/* {<Loader />} <!-- loading && (...) --> */}

      {!!itemsCount && <ProductsList phones={items} />}
    </main>
  );
};
