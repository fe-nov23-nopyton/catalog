import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Phone } from "../types/Phone";

export interface catalogState {
  phones: Phone[];
  favorites: Phone[];
  cart: Phone[];
}

const initialState: catalogState = {
  phones: [],
  favorites: [],
  cart: []
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setPhones: (state, action: PayloadAction<Phone[]>) => {
      state.phones = [...action.payload];
    },
    addToFavorite: (state, action: PayloadAction<Phone>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    deleteFromFavorite: (state, action: PayloadAction<Phone>) => {
      state.favorites.filter((item) => item.id !== action.payload.id);
    },
    addToCart: (state, action: PayloadAction<Phone>) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart: (state, action: PayloadAction<Phone>) => {
      state.cart.filter((item) => item.id !== action.payload.id);
    }
  }
});

export const SelectCatalogState = (state: catalogState) => state;
export const { setPhones, addToFavorite, deleteFromFavorite, addToCart, deleteFromCart } = catalogSlice.actions;

export default catalogSlice.reducer;
