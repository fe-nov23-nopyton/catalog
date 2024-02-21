import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Phone } from "../../types/Phone";

export interface favoritesState {
  favorites: Phone[];
}

const initialState: favoritesState = {
  favorites: [
    {
      id: "60",
      category: "phones",
      phoneId: "apple-iphone-xr-128gb-yellow",
      itemId: "apple-iphone-xr-128gb-yellow",
      name: "Apple iPhone XR 128GB Yellow",
      fullPrice: 880,
      price: 815,
      screen: "6.1' IPS",
      capacity: "128GB",
      color: "yellow",
      ram: "3GB",
      year: 2018,
      image: "img/phones/apple-iphone-xr/yellow/00.jpg"
    },
    {
      id: "61",
      category: "phones",
      phoneId: "apple-iphone-xr-128gb-yellow",
      itemId: "apple-iphone-xr-128gb-yellow",
      name: "Apple iPhone XR 128GB Yellow",
      fullPrice: 880,
      price: 815,
      screen: "6.1' IPS",
      capacity: "128GB",
      color: "yellow",
      ram: "3GB",
      year: 2018,
      image: "img/phones/apple-iphone-xr/yellow/00.jpg"
    }
  ]
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Phone[]>) => {
      state.favorites = action.payload;
    },
    addToFavorite: (state, action: PayloadAction<Phone>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    deleteFromFavorite: (state, action: PayloadAction<Phone>) => {
      state.favorites.filter((item) => item.id !== action.payload.id);
    }
  }
});

export const { setFavorites, addToFavorite, deleteFromFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
