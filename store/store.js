import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./signIn-slice";
import socketSlice from "./socket-slice";

export const store = configureStore({
  reducer: {
    sign: signInSlice,
    // socket: socketSlice,
  },
});
