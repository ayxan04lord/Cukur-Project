import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},    
  baskets: {},  
  likedItems: [],
  basketItems: [], 
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    addLikes(state, action) {
      const id = action.payload;
      if (!state.items[id]) {
        state.items[id] = 0;
      }
      state.items[id]++;
    },

    addBaskets(state, action) {
      const id = action.payload;
      if (!state.baskets[id]) {
        state.baskets[id] = 0;
      }
      state.baskets[id]++;
    },
    toggleLike: (state, action) => {
      const id = action.payload;
      const isLiked = state.likedItems.includes(id);
      if (isLiked) {
          state.likedItems = state.likedItems.filter(itemId => itemId !== id);
      } else {
          state.likedItems.push(id);
      }
  },
  toggleBasket: (state, action) => {
      const id = action.payload;
      const isInBasket = state.basketItems.includes(id);
      if (isInBasket) {
          state.basketItems = state.basketItems.filter(basketID => basketID !== id);
      } else {
          state.basketItems.push(id);
      }
  }
  },
});

export const { addLikes, addBaskets, toggleLike, toggleBasket } = navbarSlice.actions;


export default navbarSlice.reducer;


