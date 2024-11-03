import { configureStore } from "@reduxjs/toolkit";
import cartItemSlice from "./cartItemSlice";

const store = configureStore({
  reducer: {
    cart: cartItemSlice,
  },
});

export default store;
