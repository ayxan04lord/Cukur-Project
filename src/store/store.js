import { configureStore } from '@reduxjs/toolkit';

import cardReducer from '../store/card/cardReducer'; 
import navbarReducer from './navbar/navbarReducer';

const store = configureStore({
  reducer: {
    card: cardReducer,
    navbar : navbarReducer
  },
});

export default store;
