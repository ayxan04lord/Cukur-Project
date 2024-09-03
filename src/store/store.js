// import { createStore } from "redux";
// import { cardReducer } from "./card/cardReducer";

// const store = createStore(cardReducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../store/card/cardReducer'; 

const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

export default store;
