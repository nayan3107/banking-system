import React, { lazy, Suspense } from 'react';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import { MuiTheme } from './theme';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import store from './store';
// Components
import MyAlert from './components/Alert';
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
// Constatnts
import {
  CUSTOMERS,
  CUSTOMER_TRANSACTIONS,
  SINGLE_CUSTOMER,
} from './constants/routes';
import './App.css';
// Views
const ViewAllCutsomers = lazy(() => import('./views/ViewAllCustomers'));
const Home = lazy(() => import('./views/Home'));
const Customer = lazy(() => import('./views/Customer'));
const ViewAllTransactions = lazy(() =>
  import('./views/ViewAllTransactions/ViewAllTransactions')
);
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={MuiTheme}>
        <Router>
          <MyAlert />
          <Navbar />
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={'/'}>
                <ViewAllCutsomers />
              </Route>
              <Route exact path={CUSTOMERS}>
                <Home />
              </Route>
              <Route exact path={SINGLE_CUSTOMER}>
                <Customer />
              </Route>
              <Route exact path={CUSTOMER_TRANSACTIONS}>
                <ViewAllTransactions />
              </Route>
              <Route exact path='*'>
                <Redirect to={CUSTOMERS} />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
