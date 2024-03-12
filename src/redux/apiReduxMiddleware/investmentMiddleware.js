import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiClient} from '../../api/ApiClient';

export const getHoldingsData = createAsyncThunk(
  'investment/getHoldingsData',
  async (params, {rejectWithValue}) => {
    try {
      return await ApiClient.getHoldingsData();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
