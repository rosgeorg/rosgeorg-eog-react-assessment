/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

export const metricSlice = createSlice({
  name: 'metric',
  initialState: [],
  reducers: {
    addMetric: (state, action) => [...state, action.payload],
    deleteMetric: (state, action) => {
      console.log('ENTRA A DELETE');
      return state.filter((metric) => metric !== action.payload);
    },
    clearSelectedMetrics: (state) => {
      state = [];
    },
  },
});

export const { addMetric, deleteMetric, clearSelectedMetrics } = metricSlice.actions;
