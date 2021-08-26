import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { subMinutes, getUnixTime } from 'date-fns';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const MULTIPLE_METRICS_MEASUREMENTS = gql`
  query ($input: [MeasurementQuery]!) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        value
        at
        unit
      }
    }
  }
`;

const MetricChart = () => {
  const selectedMetrics = useSelector(state => state.metrics);
  const [metricQuery, setMetricQuery] = useState([]);

  useEffect(() => {
    if (!selectedMetrics.length) {
      return;
    }
    const after = getUnixTime(subMinutes(new Date().getTime(), 30));
    setMetricQuery(selectedMetrics.map((metricName) => ({
      metricName,
      after,
    })));
  }, [selectedMetrics]);

  const { loading, error, data } = useQuery(MULTIPLE_METRICS_MEASUREMENTS, {
    variables: { input: [...metricQuery] },
  });
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
  if (!data) return null;
  const { getMultipleMeasurements } = data;
  if (!getMultipleMeasurements.length) {
    return [];
  }
  const names = {
    injValveOpen: 'INJ Valve Open',
    oilTemp: 'Oil Temp',
    tubingPressure: 'Tubing Pressure',
    flareTemp: 'Flare Temp',
    casingPressure: 'Casing Pressure',
    waterTemp: 'Water Temp',
  };

  const colors = {
    injValveOpen: '#e1ad01',
    oilTemp: '#000000',
    tubingPressure: '#d8110e',
    flareTemp: '#a686cc',
    casingPressure: '#66c789',
    waterTemp: '#54b3d3',
  };
  return (
    <>
      <LineChart width={1200} height={600}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        {getMultipleMeasurements.map(n => (
          <Line
            dataKey="value"
            data={n.measurements}
            name={names[n.metric]}
            key={n.metric}
            dot={false}
            stroke={colors[n.metric]}
          />
        ))};
      </LineChart>
    </>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <MetricChart />
  </ApolloProvider>
);
