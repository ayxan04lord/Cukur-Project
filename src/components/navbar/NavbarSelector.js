import { createSelector } from 'reselect';

const selectBasketItems = state => state.basket;

export const selectTotalBasketSum = createSelector(
  [selectBasketItems],
  basket => Object.values(basket).reduce((total, itemCount) => total + itemCount, 0)
);
