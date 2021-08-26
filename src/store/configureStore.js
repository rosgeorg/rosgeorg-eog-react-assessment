import { configureStore } from '@reduxjs/toolkit';
import { metricSlice } from '../reducers/metricReducer';

export const store = configureStore({
  reducer: {
    metrics: metricSlice.reducer,
  },
});
