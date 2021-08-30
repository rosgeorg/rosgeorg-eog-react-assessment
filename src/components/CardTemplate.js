/* eslint-disable */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from '@apollo/client';
import useQueryWithVariables from '../hooks/useQueryWithVariables';

const useStyles = makeStyles({
  root: {
    minWidth: 170,
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
  let value = 0;
  let unit = '';
  const data = useQueryWithVariables(METRIC_LAST_MEASUREMENT, {
    variables: { metricName: metric },
    pollInterval: 1500,
  });
  if(data.getLastKnownMeasurement){
    value = data.getLastKnownMeasurement.value;
    unit = data.getLastKnownMeasurement.unit;
  }

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
  <CardTemplate metric={metric} />
);
