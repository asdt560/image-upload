import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';

const store = configureStore({
  reducer: {
    categoryReducer
  },
});

export default store;