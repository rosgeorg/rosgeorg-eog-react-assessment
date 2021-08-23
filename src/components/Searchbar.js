/* eslint-disable */
import React from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const METRICS = gql`{
  getMetrics
}`;

function Searchbar() {
  const classes = useStyles();
  let { loading, error, data } = useQuery(METRICS);
  
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

  // populate the array with metrics
  var metricNames = [];
  data.getMetrics.forEach(
    (metricsObject) => metricNames.push(metricsObject));
    
  return (
    <Autocomplete
        multiple
        id="tags-standard"
        options={metricNames}
        getOptionLabel={(option) => option}
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

export default Searchbar;