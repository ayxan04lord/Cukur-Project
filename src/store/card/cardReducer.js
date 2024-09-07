export const addItem = (id) => ({ type: 'ADD_ITEM', payload: id });
export const addItem2 = (id) => ({ type: 'ADD_ITEM2', payload: id });
export const toggleLike = (id) => ({ type: 'TOGGLE_LIKE', payload: id });
export const toggleBasket = (id) => ({ type: 'TOGGLE_BASKET', payload: id });

const initialState = {
    items: {},
    baskets: {},
    likedItems: [],
    basketItems: [],
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload]: (state.items[action.payload] || 0) + 1,
                },
                likedItems: [...new Set([...state.likedItems, action.payload])],
            };
        case 'ADD_ITEM2':
            return {
                ...state,
                baskets: {
                    ...state.baskets,
                    [action.payload]: (state.baskets[action.payload] || 0) + 1,
                },
                basketItems: [...new Set([...state.basketItems, action.payload])],
            };
        case 'TOGGLE_LIKE': {
            const { payload: id } = action;
            const isLiked = state.likedItems.includes(id);
            return {
                ...state,
                likedItems: isLiked
                    ? state.likedItems.filter(itemId => itemId !== id)
                    : [...state.likedItems, id]
            };
        }
        case 'TOGGLE_LIKE': {
            const { payload: id } = action;
            const isInBasket = state.basketItems.includes(id);
            return {
                ...state,
                basketItems: isInBasket
                    ? state.basketItems.filter(basketID => basketID !== id)
                    : [...state.likedItems, id]
            };
        }
        default:
            return state;
    }
};

export default cardReducer;