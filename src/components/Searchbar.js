/* eslint-disable react/jsx-props-no-spreading */
/* Quick fix for Material UI standarized component (Autocomplete) */
import React from 'react';
import { gql } from '@apollo/client';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { updateMetric, deleteMetric } from '../reducers/metricReducer';
import useQueryRequest from '../hooks/useQueryRequest';

const METRICS = gql`{
  getMetrics
}`;

function Searchbar() {
  const dispatch = useDispatch();
  const selectedMetrics = useSelector(state => state.metrics);
  const data = useQueryRequest(METRICS);

  // populate the array with metrics
  const metricNames = [];
  if (data.getMetrics) {
    data.getMetrics.forEach(
      (metricsObject) => metricNames.push(metricsObject),
    );
  }

  /* Handling metrics selection from the dropdown menu */
  const handleSelect = (event, value) => {
    const selectedValues = value;
    selectedMetrics.forEach((n) => {
      if (selectedValues.indexOf(n) === -1) {
        const i = selectedMetrics.indexOf(n);
        dispatch((deleteMetric(selectedMetrics[i])));
      }
    });
    const selectedValue = selectedValues.filter(
      (metric) => !selectedMetrics.includes(metric),
    );
    if (selectedValue.length) {
      dispatch(updateMetric(selectedValue[0]));
    }
  };

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      style={{ width: '900px' }}
      options={metricNames}
      getOptionLabel={(option) => option}
      onChange={handleSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Metric Values"
          placeholder="Metric"
        />
      )}
    />
  );
}

export default Searchbar;
