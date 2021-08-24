import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const METRIC_LAST_MEASUREMENT = gql`
  query ($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
      metric
      at
      value
      unit
    }
  }
`;

const CardTemplate = ({ metric }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(METRIC_LAST_MEASUREMENT, {
    variables: { metricName: metric },
    pollInterval: 2000,
  });
  if (loading) {
    return <CircularProgress />;
  } if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Sorry, something might not be working at the moment!
      </Alert>
    );
  }
  const { value, unit } = data.getLastKnownMeasurement;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {metric}
        </Typography>
        <Typography variant="h5" component="h2">
          {value} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ({ metric }) => (
  <ApolloProvider client={client}>
    <CardTemplate metric={metric} />
  </ApolloProvider>
);
