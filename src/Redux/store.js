import { configureStore } from "@reduxjs/toolkit";
import cartItemSlice from "./cartItemSlice";

const store = configureStore({
  reducer: {
    cartItem: cartItemSlice,
  },
});

export default store;
