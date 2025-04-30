import { configureStore } from "@reduxjs/toolkit";
import PasteReducer from "./Redux/Pasteslice";

export const store = configureStore({
  reducer: {
    Paste: PasteReducer,
  },
});
