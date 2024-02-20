/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Phone } from "../../types/Phone";

export interface favoritesState {
  favorites: Phone[];
}

const initialState: favoritesState = {
  favorites: [
    {
      id: 1,
      name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
      price: "$699",
      image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
      screen: "6.1-inch",
      capacity: "64GB, 128GB, 256GB",
      ram: "4GB"
    },
    {
      id: 2,
      name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
      price: "$699",
      image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
      screen: "6.1-inch",
      capacity: "64GB, 128GB, 256GB",
      ram: "4GB"
    },
    {
      id: 3,
      name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
      price: "$699",
      image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
      screen: "6.1-inch",
      capacity: "64GB, 128GB, 256GB",
      ram: "4GB"
    },
    {
      id: 4,
      name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
      price: "$699",
      image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
      screen: "6.1-inch",
      capacity: "64GB, 128GB, 256GB",
      ram: "4GB"
    },
    {
      id: 5,
      name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
      price: "$699",
      image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
      screen: "6.1-inch",
      capacity: "64GB, 128GB, 256GB",
      ram: "4GB"
    },
    {
      id: 6,
      name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
      price: "$699",
      image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
      screen: "6.1-inch",
      capacity: "64GB, 128GB, 256GB",
      ram: "4GB"
    },
    {
      id: 7,
      name: "iPhone 12",
      price: "$699",
      image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
      screen: "6.1-inch",
      capacity: "64GB, 128GB, 256GB",
      ram: "4GB"
    }
  ],
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
    },
  }
});

export const { setFavorites, addToFavorite, deleteFromFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
