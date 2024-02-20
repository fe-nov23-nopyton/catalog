/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem";

export interface cartState {
  cart: CartItem[];
}

const initialState: cartState = {
  cart: [],
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
