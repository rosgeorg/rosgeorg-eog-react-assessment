/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

export const metricSlice = createSlice({
  name: 'metric',
  initialState: [],
  reducers: {
    updateMetric: (state, action) => [...state, action.payload],
    deleteMetric: (state, action) => {
      return state.filter((metric) => metric !== action.payload);
    },
    clearSelectedMetrics: (state) => {
      state = [];
    },
  },
});

export const { updateMetric, deleteMetric, clearSelectedMetrics } = metricSlice.actions;
