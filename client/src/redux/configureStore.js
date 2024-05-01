import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';
import imagesReducer from './images/imagesSlice';
import sessionReducer from './session/sessionSlice';

const store = configureStore({
  reducer: {
    categoryReducer,
    imagesReducer,
    sessionReducer
  },
});

export default store;