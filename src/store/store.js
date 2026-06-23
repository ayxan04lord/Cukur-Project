import { configureStore } from '@reduxjs/toolkit';
import cardReducer    from './card/cardReducer';
import navbarReducer  from './navbar/navbarReducer';
import authReducer    from './auth/authReducer';
import themeReducer   from './theme/themeReducer';
import contentReducer from './content/contentReducer';

const store = configureStore({
  reducer: {
    card:    cardReducer,
    navbar:  navbarReducer,
    auth:    authReducer,
    theme:   themeReducer,
    content: contentReducer,
  },
});

export default store;
