import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SelectedPhone } from "../../types/SelectedPhone";
import { getPhoneData } from "../../utils/fetchClient";

export interface productDataState {
  phoneData: SelectedPhone;
  color: string;
  capacity: string;
  loading: boolean;
  errorMessage?: string;
}

const initialState: productDataState = {
  phoneData: {} as SelectedPhone,
  color: "",
  capacity: "",
  loading: true,
  errorMessage: ""
};

export const fetchPhone = createAsyncThunk("productData/fetch", (pathName: string) => getPhoneData(pathName));

export const productDataSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    selectNewColor: (state, action) => {
      state.color = action.payload;
    },
    selectNewCapacity: (state, action) => {
      state.capacity = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhone.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhone.fulfilled, (state, action) => {
        const normalizedData = {
          ...action.payload,
          images: action.payload.images.map((item: string) => item.replace(".jpg", ".png"))
        };
        state.phoneData = normalizedData;
        state.loading = false;
      })
      .addCase(fetchPhone.rejected, (state) => {
        state.errorMessage = "Sorry( Please try again later.";
        state.loading = false;
      });
  }
});

export const { selectNewColor, selectNewCapacity } = productDataSlice.actions;

export default productDataSlice.reducer;
