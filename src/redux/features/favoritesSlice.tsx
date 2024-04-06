import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

export interface favoritesState {
  favorites: Product[];
}

const initialState: favoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]") as Product[]
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload;
    },
    clickFavorite: (state, action: PayloadAction<Product>) => {
      if (state.favorites.some((item) => item.id === action.payload.id)) {
        state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
      } else {
        state.favorites = [...state.favorites, action.payload];

        const cartItems = JSON.parse(localStorage.getItem("favorites") || "[]");
        localStorage.setItem("favorites", JSON.stringify([...cartItems, action.payload]));
      }
    }
  }
});

export const { setFavorites, clickFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
