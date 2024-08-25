// import { ADD_ITEM, ADD2_ITEM } from "../../actionTypes/actionTypes";

// const initialState = {
//   items: {},
//   basket: {},
// };

// export const cardReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ITEM:
//       return {
//         ...state,
//         items: {
//           ...state.items,
//           [action.payload]: (state.items[action.payload] || 0) + 1
//         }
//       };

//     case ADD2_ITEM:
//       return {
//         ...state,
//         basket: {
//           ...state.basket,
//           [action.payload]: (state.basket[action.payload] || 0) + 1
//         }
//       };

//     default:
//       return state;
//   }
// };

// REDUX -------------------------------------------------------------------

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},     
  baskets: {},   
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
      console.log('addItem called', state);
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


