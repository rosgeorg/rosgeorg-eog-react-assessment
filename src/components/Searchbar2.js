/* eslint-disable */
import React from 'react';
import clsx from 'clsx';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { addMetric, deleteMetric } from '../reducers/metricReducer';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, metricName, theme) {
  return {
    fontWeight:
      metricName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const METRICS = gql`{
  getMetrics
}`;

function Searchbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [metricName, setMetricName] = React.useState([]);
  const [open, setOpen] = React.useState();
  const dispatch = useDispatch();
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


  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setMetricName(value);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelect = (e) => {
    console.log('ENTRA A HANDLE SELECT');
    setMetricName(e.target.value);
    const selectedValues = metricName;
    const selectedValue = selectedValues.filter(
      (metric) => !selectedMetrics.includes(metric),
    );
    console.log('SELECTED VALUE',selectedValue);
    console.log('VALUE 0', selectedValue[0]);
    if (selectedValue.length) {
      dispatch(addMetric(selectedValue[0]));
    }
    
  };

  const handleDelete = (value) => {
    dispatch(deleteMetric(value));
  };

  // populate the array with metrics
  var metricNames = [];
  data.getMetrics.forEach(
    (metricsObject) => metricNames.push(metricsObject));
    
  return (
    <FormControl className={classes.formControl}>
    <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
    <Select
      labelId="demo-mutiple-chip-label"
      id="demo-mutiple-chip"
      multiple
      value={metricName}
      onClick={handleOpen}
      onChange={handleSelect}
      input={<Input id="select-multiple-chip" />}
      renderValue={(selected) => (
        <div className={classes.chips}>
          {selected.map((value) => (
            <Chip key={value} label={value} className={classes.chip} onDelete={() => handleDelete(selected)} />
          ))}
        </div>
      )}
      MenuProps={MenuProps}
    >
      {metricNames.map((name) => (
        <MenuItem key={name} value={name} style={getStyles(name, metricName, theme)}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  );  
};

export default () => (
  <ApolloProvider client={client}>
    <Searchbar />
  </ApolloProvider>
);
