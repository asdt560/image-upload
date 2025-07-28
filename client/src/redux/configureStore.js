import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';
import imagesReducer from './images/imagesSlice';
import sessionReducer from './session/sessionSlice';
import registrationReducer from './registration/registrationSlice';
import searchReducer from './search/searchSlice';

const store = configureStore({
  reducer: {
    categoryReducer,
    imagesReducer,
    sessionReducer,
    registrationReducer,
    searchReducer,
  },
});

export default store;