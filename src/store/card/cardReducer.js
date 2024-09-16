import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    baskets: [],
    likedItems: [],
    basketItems: [],
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addLikes: (state, action) => {
            const id = action.payload;
            state.items[id] = (state.items[id] || 0) + 1;
            if (!state.likedItems.includes(id)) {
                state.likedItems.push(id);
            }
        },
        addMovies:(state, action)=>{
            state.items = action.payload
        },
        addBaskets: (state, action) => {
            const id = action.payload;
            state.baskets[id] = (state.baskets[id] || 0) + 1;
            if (!state.basketItems.includes(id)) {
                state.basketItems.push(id);
            }
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
    }
});

export const { addLikes, addBaskets, toggleLike, toggleBasket, addMovies } = cardSlice.actions;

export default cardSlice.reducer;
