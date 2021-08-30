import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Searchbar from './components/Searchbar';
import MetricCard from './components/MetricCard';
import MetricChart from './components/MetricChart';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <CssBaseline />
      <Wrapper>
        <Header />
        <Searchbar />
        <MetricCard />
        <MetricChart />
        <ToastContainer />
      </Wrapper>
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
