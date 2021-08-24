import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import CardTemplate from './CardTemplate';

function MetricCard() {
  const selectedMetrics = useSelector(state => state.metrics);
  return (
    <Grid container direction="row" justifyContent='flex-start' spacing={10}>
      {
        selectedMetrics.length > 0 && selectedMetrics.map((metric) => (
          <Grid
            container
            item
            xs={12}
            key={metric}
            style={{ maxWidth: '275px', maxHeight: '100px', margin: '10px' }}
          >
            <CardTemplate metric={metric} />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default MetricCard;
