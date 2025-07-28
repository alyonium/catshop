import type { RootState } from 'store/store.ts';
import { createSelector } from '@reduxjs/toolkit';
import type { Cat } from 'types/types.ts';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsCount = createSelector(
  selectCartItems,
  (items) => items.length,
);

export const selectIsItemInCart = (id: Cat['id']) =>
  createSelector(selectCartItems, (items) => {
    return !!items.find((item) => item.id === id);
  });
