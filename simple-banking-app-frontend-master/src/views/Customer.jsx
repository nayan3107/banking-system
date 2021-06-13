import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  getAllCustomers,
  getCustomer,
  setFilteredCustomers,
} from '../slices/customerSlice';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { FormContainer } from '../components/FormContainer';
import { Typography, Fab, Button, Modal } from '@material-ui/core';
import { ChevronLeft, SearchOutlined } from '@material-ui/icons';
import { CUSTOMERS, CUSTOMER_TRANSACTIONS } from '../constants/routes';
import EnhancedAddMoneyForm from './AddMoney/EnhancedAddMoneyForm';
import EnhancedTransferMoneyForm from './TrasnsferMoney/EnhancedTransferMoneyForm';

const Customer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const {
    customer: { allCustomers, customer, lastTransaction, loading },
  } = useSelector((state) => {
    return {
      customer: state.customer,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getCustomer(params.id));
  }, []);
  useEffect(() => {
    dispatch(getCustomer(params.id));
  }, [params.id]);
  useEffect(() => {
    dispatch(getCustomer(params.id));
  }, [dispatch, lastTransaction, params.id]);

  if (allCustomers === null || customer === null || loading) return <Loader />;
  return (
    <FormContainer
      styles={
        {
          // height: 600,
          // overflow: 'scroll',
        }
      }
    >
      <Button
        style={{ color: 'green', borderColor: 'green' }}
        startIcon={<ChevronLeft />}
        variant='outlined'
      >
        <Link to={CUSTOMERS} style={{ textDecoration: 'none', color: 'green' }}>
          Go Back
        </Link>
      </Button>
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <div>
          <Typography variant='h4' gutterBottom>
            {customer.name}
          </Typography>
          <Typography
            variant='body2'
            style={{ color: 'gray' }}
            component='body'
            gutterBottom
          >
            {customer._id}
          </Typography>
        </div>
        <div>
          {' '}
          <Fab
            variant='extended'
            style={{
              color: '#fff',
              background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
            }}
            aria-label='add'
            // onClick={() => setOpenModal(true)}
          >
            <AttachMoneyIcon /> {customer.currentBalance}
          </Fab>
        </div>
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Button
          variant='outlined'
          style={{ color: 'tomato', borderColor: 'tomato' }}
          onClick={() => setOpenModal(true)}
        >
          Add Money
        </Button>
        <Button
          variant='outlined'
          style={{ color: 'cyan', borderColor: 'cyan' }}
          onClick={() => setOpenModal2(true)}
        >
          Transfer Money
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          margin: '1rem',
        }}
      >
        <Button
          variant='outlined'
          style={{ color: 'orange', borderColor: 'orange' }}
          onClick={() =>
            history.push(`${CUSTOMERS}/${customer._id}/transactions`)
          }
        >
          View All Transactions
        </Button>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        style={{ border: 'none' }}
        disableAutoFocus={true}
      >
        <div style={{ marginTop: '5rem', outline: 'none' }}>
          <EnhancedAddMoneyForm setOpenModal={setOpenModal} />
        </div>
      </Modal>
      <Modal
        open={openModal2}
        onClose={() => setOpenModal2(false)}
        style={{ border: 'none' }}
        disableAutoFocus={true}
      >
        <div style={{ marginTop: '5rem', outline: 'none' }}>
          <EnhancedTransferMoneyForm setOpenModal={setOpenModal2} />
        </div>
      </Modal>
    </FormContainer>
  );
};

Customer.propTypes = {};

export default Customer;
