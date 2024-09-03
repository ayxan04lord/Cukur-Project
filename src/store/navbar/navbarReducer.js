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


