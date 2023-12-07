import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productsReducer from "./features/products/productsSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    productsState: productsReducer,
    cartState: cartReducer,
  },
});
