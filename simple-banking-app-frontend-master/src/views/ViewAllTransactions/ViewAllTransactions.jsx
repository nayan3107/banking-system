import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { useHistory, useParams, Link } from 'react-router-dom';
import {
  getAllCustomers,
  getCustomer,
  setFilteredCustomers,
  getCustomerTransactions,
} from '../../slices/customerSlice';
import { FormContainer } from '../../components/FormContainer';
import {
  Typography,
  TextField,
  InputAdornment,
  Fab,
  List,
  ListItem,
  ListItemSecondaryAction,
  Paper,
  ListItemText,
  Button,
} from '@material-ui/core';
import { SearchOutlined, AttachMoney, ChevronLeft } from '@material-ui/icons';
import { CUSTOMERS } from '../../constants/routes';

const ViewAllTransactions = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const {
    customer: { customerTransactions, customer, lastTransaction, loading },
  } = useSelector((state) => {
    return {
      customer: state.customer,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getCustomerTransactions(params.id));
  }, []);
  useEffect(() => {
    dispatch(getCustomerTransactions(params.id));
  }, [lastTransaction, params.id]);

  if (customerTransactions === null || loading) return <Loader />;
  return (
    <FormContainer
      styles={{
        height: 600,
        // overflow: 'scroll',
      }}
    >
      <Button
        style={{ color: 'green', borderColor: 'green' }}
        startIcon={<ChevronLeft />}
        variant='outlined'
      >
        <Link
          to={`${CUSTOMERS}/${params.id}`}
          style={{ textDecoration: 'none', color: 'green' }}
        >
          Go Back
        </Link>
      </Button>
      <br />
      <br />
      <Typography variant='h5' gutterBottom>
        Transactions List
      </Typography>
      <br />

      <List style={{ height: 450, overflow: 'scroll', padding: '0.5rem' }}>
        {customerTransactions.length > 0 ? (
          customerTransactions.map((transaction) => {
            return (
              <Paper
                key={transaction._id}
                style={{
                  padding: '0.5rem',

                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                }}
                elevation={3}
              >
                <ListItem style={{ width: '100%' }}>
                  <ListItemText
                    primary={
                      <span
                        style={{
                          fontSize: '0.8rem',
                        }}
                      >
                        {transaction.mode === 'self'
                          ? 'Own Account'
                          : transaction.sentTo.name}
                      </span>
                    }
                    secondary={
                      <>
                        <span
                          style={{
                            fontSize: '0.7rem',
                          }}
                        >
                          {transaction.mode === 'self'
                            ? transaction.sentFrom._id
                            : transaction.sentTo._id}
                        </span>
                        <br />
                        <span
                          style={{
                            fontSize: '0.78rem',
                          }}
                        >
                          {new Date(transaction.createdAt)
                            .toISOString()
                            .slice(0, 10)}
                        </span>
                      </>
                    }
                  />
                  <ListItemSecondaryAction
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Fab
                      variant='extended'
                      style={{
                        color: '#fff',
                        background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
                      }}
                      size='small'
                      aria-label='add'
                      // onClick={() => setOpenModal(true)}
                    >
                      <AttachMoney /> {transaction.amountSent}
                    </Fab>
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
                      No transactions
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

ViewAllTransactions.propTypes = {};

export default ViewAllTransactions;
