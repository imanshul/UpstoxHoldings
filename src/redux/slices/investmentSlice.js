import {createSlice} from '@reduxjs/toolkit';
import BaseAPIState from '../../constants/BaseAPIState';
import {getHoldingsData} from '../apiReduxMiddleware/investmentMiddleware';

const initialState = {
  holdingsAPIData: BaseAPIState,
};

export const investmentSlice = createSlice({
  name: 'investment',
  initialState,
  reducers: {
    resetHoldingsAPIData: (state, action) => {
      state.holdingsAPIData = initialState.holdingsAPIData;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getHoldingsData.pending, state => {
        state.holdingsAPIData.isLoading = true;
      })
      .addCase(getHoldingsData.fulfilled, (state, action) => {
        state.holdingsAPIData.isLoading = false;
        state.holdingsAPIData.payload = action.payload;
      })
      .addCase(getHoldingsData.rejected, (state, action) => {
        state.holdingsAPIData.isLoading = false;
        state.holdingsAPIData.error = action.payload.error;
      });
  },
});

// Action creators are generated for each case reducer function
export const {resetHoldingsAPIData} = investmentSlice.actions;

export default investmentSlice.reducer;
