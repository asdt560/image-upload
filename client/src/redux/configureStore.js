import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';
import imagesReducer from './images/imagesSlice';

const store = configureStore({
  reducer: {
    categoryReducer,
    imagesReducer
  },
});

export default store;