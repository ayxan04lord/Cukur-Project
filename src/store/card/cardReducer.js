export const addItem = (id) => ({ type: 'ADD_ITEM', payload: id });
export const addItem2 = (id) => ({ type: 'ADD_ITEM2', payload: id });


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
              likedItems: [...new Set([...state.likedItems, action.payload])], // добавляем в понравившиеся
          };
      case 'ADD_ITEM2':
          return {
              ...state,
              baskets: {
                  ...state.baskets,
                  [action.payload]: (state.baskets[action.payload] || 0) + 1,
              },
              basketItems: [...new Set([...state.basketItems, action.payload])], // добавляем в корзину
          };
      default:
          return state;
  }
};

// Actions

export default cardReducer;