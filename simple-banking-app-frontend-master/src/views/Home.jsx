import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import { useHistory } from 'react-router-dom';
import {
  getAllCustomers,
  getCustomer,
  setFilteredCustomers,
} from '../slices/customerSlice';
import { FormContainer } from '../components/FormContainer';
import {
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  Paper,
  ListItemText,
  Button,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { CUSTOMERS } from '../constants/routes';

const Home = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    customer: { filteredAllCustomers, lastTransaction, loading },
  } = useSelector((state) => {
    return {
      customer: state.customer,
    };
  }, shallowEqual);
  const [query, setQuery] = useState('');
  useEffect(() => {
    dispatch(getAllCustomers());
  }, []);
  useEffect(() => {
    dispatch(getAllCustomers());
  }, [lastTransaction]);

  useEffect(() => {
    dispatch(setFilteredCustomers(query));
    //eslint-disable-next-line
  }, [query]);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  if (filteredAllCustomers === null || loading) return <Loader />;
  return (
    <FormContainer
      styles={{
        height: 600,
        // overflow: 'scroll',
      }}
    >
      <Typography variant='h5' gutterBottom>
        Customer List
      </Typography>
      <br />
      <TextField
        fullWidth
        variant='outlined'
        label='Search Customers'
        placeholder='Search...'
        name='query'
        value={query}
        onChange={handleQueryChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />
      <List style={{ height: 450, overflow: 'scroll', padding: '0.5rem' }}>
        {filteredAllCustomers.length > 0 ? (
          filteredAllCustomers.map((customer) => {
            return (
              <Paper
                key={customer._id}
                style={{
                  padding: '0.5rem',

                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                }}
                elevation={3}
              >
                <ListItem style={{ width: '100%' }}>
                  <ListItemText
                    onClick={() => {
                      dispatch(getCustomer(customer._id));
                      history.push(`${CUSTOMERS}/${customer._id}`);
                    }}
                    primary={
                      <span
                        style={{
                          fontSize: '0.8rem',
                        }}
                      >
                        {customer.name}
                      </span>
                    }
                    secondary={
                      <span
                        style={{
                          fontSize: '0.75rem',
                        }}
                      >
                        {customer._id}
                      </span>
                    }
                  />
                  <ListItemSecondaryAction
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Button
                      onClick={() => {
                        dispatch(getCustomer(customer._id));
                        history.push(`${CUSTOMERS}/${customer._id}`);
                      }}
                      variant='outlined'
                      style={{ color: 'orange', borderColor: 'orange' }}
                    >
                      View
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            );
          })
        ) : (
          <>
            <Paper
              style={{
                padding: '0.5rem',
                marginBottom: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <ListItem style={{ width: '100%' }}>
                <ListItemText
                  primary={
                    <span
                      style={{
                        fontSize: '0.8rem',
                      }}
                    >
                      No results found....
                    </span>
                  }
                  d
                />
              </ListItem>
            </Paper>
          </>
        )}
      </List>
    </FormContainer>
  );
};

Home.propTypes = {};

export default Home;
