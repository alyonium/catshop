import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/store.ts';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = shopSlice.actions;

export const selectCount = (state: RootState) => state.records.value;

export default shopSlice.reducer;
