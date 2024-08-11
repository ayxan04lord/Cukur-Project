import { ADD_ITEM, ADD2_ITEM } from "../../actionTypes/actionTypes";

const initialState = {
  items: {},
  basket: {},
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: (state.items[action.payload] || 0) + 1
        }
      };

    case ADD2_ITEM:
      return {
        ...state,
        basket: {
          ...state.basket,
          [action.payload]: (state.basket[action.payload] || 0) + 1
        }
      };

    default:
      return state;
  }
};
