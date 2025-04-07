import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import roomPostReducer from "./roomPostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roomPost: roomPostReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
