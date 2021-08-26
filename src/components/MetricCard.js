import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import CardTemplate from './CardTemplate';

function MetricCard() {
  const selectedMetrics = useSelector(state => state.metrics);
  return (
    <Grid container style={{ margin: '0px' }} direction="row" justifyContent='flex-start' spacing={10}>
      {
        selectedMetrics.length > 0 && selectedMetrics.map((metric) => (
          <Grid
            container
            item
            xs={12}
            key={metric}
            style={{
              maxWidth: '170px',
              maxHeight: '100px',
              marginTop: '15px',
              marginBottom: '15px',
              marginRight: '20px',
              padding: '0px',
            }}
          >
            <CardTemplate metric={metric} />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default MetricCard;
