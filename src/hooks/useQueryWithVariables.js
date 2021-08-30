import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useQuery } from '@apollo/client';

function useQueryWithVariables(queryName, queryVariables) {
  const { loading, error, data } = useQuery(queryName, queryVariables);
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
  return data;
}

export default useQueryWithVariables;
