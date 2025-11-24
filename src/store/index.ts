import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userData';


export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Define RootState and AppDispatch types after store initialization
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
export default store;
