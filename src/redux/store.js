import {configureStore} from '@reduxjs/toolkit';
import investmentReducer from './slices/investmentSlice';

export const store = configureStore({
  reducer: {
    investment: investmentReducer,
  },
});
