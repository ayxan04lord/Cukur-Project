import { ADD_ITEM, ADD2_ITEM } from "../../actionTypes/actionTypes";

const initialState = {
  numOfItems: 0,
  numOfBasket : 0,
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems + 1,
      };

    case ADD2_ITEM:
      return {
        ...state,
        numOfBasket: state.numOfBasket + 1,
      };
    default:
      return state;
  }
};