// import { ADD_ITEM, ADD2_ITEM } from "../../actionTypes/actionTypes";

// const initialState = {
//   numOfItems: 0,
//   numOfBasket : 0,
// };

// export const cardReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ITEM:
//       return {
//         ...state,
//         numOfItems: state.numOfItems + 1,
//       };

//     case ADD2_ITEM:
//       return {
//         ...state,
//         numOfBasket: state.numOfBasket + 1,
//       };
//     default:
//       return state;
//   }
// };

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},     // Будем использовать объект для хранения количества по каждому id
  baskets: {},   // Отдельный объект для хранения количества в корзине по каждому id
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItem(state, action) {
      const id = action.payload;
      if (!state.items[id]) {
        state.items[id] = 0;
      }
      state.items[id]++;
    },

    addItem2(state, action) {
      const id = action.payload;
      if (!state.baskets[id]) {
        state.baskets[id] = 0;
      }
      state.baskets[id]++;
    },
  },
});

export const { addItem, addItem2 } = cardSlice.actions;

export default cardSlice.reducer;


