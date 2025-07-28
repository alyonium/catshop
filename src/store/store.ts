import { configureStore } from '@reduxjs/toolkit';
import shopReducer from 'modules/shop/shopSlice';
import { api } from 'api/apiSlice.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cartSlice } from 'modules/shop/components/cart/cartSlice';

export const store = configureStore({
  reducer: {
    records: shopReducer,
    cart: cartSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
