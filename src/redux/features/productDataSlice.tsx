import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SelectedPhone } from "../../types/SelectedPhone";
import { getProductData } from "../../utils/fetchClient";

export interface productDataState {
  productData: SelectedPhone;
  color: string;
  capacity: string;
  loading: boolean;
  errorMessage?: string;
}

const initialState: productDataState = {
  productData: {} as SelectedPhone,
  color: "",
  capacity: "",
  loading: true,
  errorMessage: ""
};

export const fetchProduct = createAsyncThunk("productData/fetch", (id: string) => getProductData(id));

export const productDataSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const normalizedData = {
          ...action.payload,
          images: action.payload.images.map((item: string) => item.replace(".jpg", ".png"))
        };
        state.productData = normalizedData;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.errorMessage = "Sorry( Please try again later.";
        state.loading = false;
      });
  }
});

export const {} = productDataSlice.actions;

export default productDataSlice.reducer;
