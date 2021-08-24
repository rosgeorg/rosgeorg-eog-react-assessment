/* eslint-disable */
import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from "@apollo/client";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { updateMetric, deleteMetric } from '../reducers/metricReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const METRICS = gql`{
  getMetrics
}`;

function Searchbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  let { loading, error, data } = useQuery(METRICS);
  const selectedMetrics = useSelector((state) => state.metrics);
  console.log('STATE',selectedMetrics);
 
  if (loading) {
      return <CircularProgress />
  } else if (error) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Sorry, something might not be working at the moment!
        </Alert>
      )
  }

  const handleSelect = (event, value) => {
    const selectedValues = value;
    selectedMetrics.forEach((data) => {
      if(selectedValues.indexOf(data) === -1){
        const i = selectedMetrics.indexOf(data);
        dispatch((deleteMetric(selectedMetrics[i])))
      }
    })
    const selectedValue = selectedValues.filter(
      (metric) => !selectedMetrics.includes(metric),
    );
    if (selectedValue.length) {
      dispatch(updateMetric(selectedValue[0]));
    }
    
  };

  // populate the array with metrics
  var metricNames = [];
  data.getMetrics.forEach(
    (metricsObject) => metricNames.push(metricsObject));
    
  return (
    <Autocomplete
        multiple
        id="tags-standard"
        style={{ width: "450px" }}
        options={metricNames}
        getOptionLabel={(option) => option}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Metric"
          />
        )}
      />
  );  
};

export default () => (
  <ApolloProvider client={client}>
    <Searchbar />
  </ApolloProvider>
);
