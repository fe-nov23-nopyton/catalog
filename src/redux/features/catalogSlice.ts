/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Phone } from "../../types/Phone";
import { getPhones } from "../../utils/fetchClient";

export interface catalogState {
  phones: Phone[];
  loading: boolean;
  error: boolean;
}

const initialState: catalogState = {
  phones: [],
  loading: false,
  error: false,
};


export const fetchPhones = createAsyncThunk(
  'catalog/fetch',
  () => getPhones()
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
        state.error = true;
        state.loading = false;
      })}
})

export default catalogSlice.reducer;
