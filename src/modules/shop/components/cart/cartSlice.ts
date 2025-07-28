import { createSlice } from '@reduxjs/toolkit';
import type { CartState, Cat } from 'types/types.ts';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: CartState, action: PayloadAction<Cat>) {
      state.items.push(action.payload);
    },
    removeItem(state: CartState, action: PayloadAction<Cat>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart(state: CartState) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
