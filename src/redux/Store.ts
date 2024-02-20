import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./features/filterSlice";
import catalogSlice from "./features/catalogSlice";
import cartSlice from "./features/cartSlice";
import favoritesSlice from "./features/favoritesSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    catalog: catalogSlice,
    favorites: favoritesSlice,
    filter: filterSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
