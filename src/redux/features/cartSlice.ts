/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem";

export interface cartState {
  cart: CartItem[];
}

const initialState: cartState = {
  cart: [
    {
      id: 1,
      product: {
        id: 1,
        name: "iPhone 12",
        price: 799,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000",
      },
      quantity: 1,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "iPhone 12 Pro",
        price: 999,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021666000",
      },
      quantity: 1,
    },
    {
      id: 3,
      product: {
        id: 3,
        name: "iPhone 12 Pro Max",
        price: 1099,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-graphite-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021658000",
      },
      quantity: 1,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = [...action.payload];
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.product.id);
    },
    deleteCartItems: (state) => {
      state.cart = [];
    },
    addQuantity: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
        }
        return item;
      });
    },
    subtractQuantity: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.map((item) => {
        if (item.quantity === 1) return item;
        if (item.id === action.payload.id) {
          item.quantity -= 1;
        }
        return item;
      });
    }
  }
});

export const { setCart, addToCart, deleteFromCart, addQuantity, subtractQuantity, deleteCartItems } = cartSlice.actions;

export default cartSlice.reducer;
