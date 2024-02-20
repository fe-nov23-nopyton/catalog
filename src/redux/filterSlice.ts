import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// enum SortBy {
//   Newest = "Newest",
//   Price = "Price",
//   Capacity = "Capacity",
//   Ram = "Ram"
// }

export interface filterState {
  sortBy: string;
  itemsOnPage: number;
}

const initialState: filterState = {
  sortBy: "Newest",
  itemsOnPage: 16
};

export const filterSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setItemsOnPage: (state, action: PayloadAction<number>) => {
      state.itemsOnPage = action.payload;
    }
  }
});

export const SelectFilterState = (state: filterState) => state;
export const {} = filterSlice.actions;

export default filterSlice.reducer;
