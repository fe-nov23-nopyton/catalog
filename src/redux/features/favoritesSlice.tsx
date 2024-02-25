import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Phone } from "../../types/Phone";

export interface favoritesState {
  favorites: Phone[];
}

const initialState: favoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]") as Phone[]
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Phone[]>) => {
      state.favorites = action.payload;
    },
    clickFavorite: (state, action: PayloadAction<Phone>) => {
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
