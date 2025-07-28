import { configureStore } from '@reduxjs/toolkit';
import { api } from 'api/apiSlice.ts';
import cartReducer from 'store/cart/cartSlice.ts';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
