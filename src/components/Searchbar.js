/* eslint-disable react/jsx-props-no-spreading */
/* Quick fix for Material UI standarized component (Autocomplete) */
import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { updateMetric, deleteMetric } from '../reducers/metricReducer';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const METRICS = gql`{
  getMetrics
}`;

function Searchbar() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(METRICS);
  const selectedMetrics = useSelector((state) => state.metrics);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Sorry, something might not be working at the moment!
      </Alert>
    );
  }

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

  // populate the array with metrics
  const metricNames = [];
  data.getMetrics.forEach(
    (metricsObject) => metricNames.push(metricsObject),
  );

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

export default () => (
  <ApolloProvider client={client}>
    <Searchbar />
  </ApolloProvider>
);
