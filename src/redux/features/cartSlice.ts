/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../types/Item";

export interface cartState {
  cart: Item[];
}

const initialState: cartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]") as Item[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Item[]>) => {
      state.cart = [...action.payload];
    },
    addToCart: (state, action: PayloadAction<Item>) => {
      if (state.cart.some((item) => item.id === action.payload.id)) {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1;
          }
          return item;
        });
        return;
      }
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart: (state, action: PayloadAction<Item>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.product.id);
    },
    deleteCartItems: (state) => {
      state.cart = [];
    },
    addQuantity: (state, action: PayloadAction<Item>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
        }
        return item;
      });
    },
    subtractQuantity: (state, action: PayloadAction<Item>) => {
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
