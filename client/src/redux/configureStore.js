import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categories/categorySlice';
import imagesReducer from './images/imagesSlice';
import sessionReducer from './session/sessionSlice';
import registrationReducer from './registration/registrationSlice';

const store = configureStore({
  reducer: {
    categoryReducer,
    imagesReducer,
    sessionReducer,
    registrationReducer
  },
});

export default store;