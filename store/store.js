import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./signIn-slice";

export const store = configureStore({
  reducer: {
    sign: signInSlice,
  },
});
