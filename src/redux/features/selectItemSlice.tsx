import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface selectItemState {
  isSelected: boolean;
}

const initialState: selectItemState = {
  isSelected: false
};

export const selectItemSlice = createSlice({
  name: "selectItem",
  initialState,
  reducers: {
    setSelectItem: (state, action: PayloadAction<boolean>) => {
      state.isSelected = action.payload;
    }
  }
});

export const { setSelectItem } = selectItemSlice.actions;

export default selectItemSlice.reducer;
