/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { getProducts } from "../../utils/fetchClient";

export interface catalogState {
  phones: Product[];
  tablets: Product[];
  accessories: Product[];
  loading: boolean;
  errorMessage: string;
}

const initialState: catalogState = {
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  errorMessage: "",
};


export const fetchPhones = createAsyncThunk(
  'catalog/fetchPhones',
  () => getProducts('phones')
);
export const fetchTablets = createAsyncThunk(
  'catalog/fetchTablets',
  () => getProducts('tablets')
);
export const fetchAccessories = createAsyncThunk(
  'catalog/fetchAccessories',
  () => getProducts('accessories')
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhones.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.phones = action.payload;
        state.loading = false;
      })
      .addCase(fetchPhones.rejected, (state) => {
        state.errorMessage = 'Sorry( Please try again later.';
        state.loading = false;
      })
      .addCase(fetchTablets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTablets.fulfilled, (state, action) => {
        state.tablets = action.payload;
        state.loading = false;
      })
      .addCase(fetchTablets.rejected, (state) => {
        state.errorMessage = 'Sorry( Please try again later.';
        state.loading = false;
      })
      .addCase(fetchAccessories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccessories.fulfilled, (state, action) => {
        state.accessories = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccessories.rejected, (state) => {
        state.errorMessage = 'Sorry( Please try again later.';
        state.loading = false;
      });
    }
})

export default catalogSlice.reducer;
