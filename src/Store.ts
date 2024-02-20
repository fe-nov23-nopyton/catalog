import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./redux/filterSlice";
import catalogSlice from "./redux/catalogSlice";

export const store = configureStore({
  reducer: {
    catalog: catalogSlice,
    filter: filterSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
