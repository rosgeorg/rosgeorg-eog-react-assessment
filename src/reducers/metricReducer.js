import { createSlice } from '@reduxjs/toolkit';

export const metricSlice = createSlice({
  name: 'metric',
  initialState: [],
  reducers: {
    updateMetric: (state, action) => [...state, action.payload],
    deleteMetric: (state, action) => (
      state.filter((metric) => metric !== action.payload)
    ),
  },
});

export const { updateMetric, deleteMetric, clearSelectedMetrics } = metricSlice.actions;
