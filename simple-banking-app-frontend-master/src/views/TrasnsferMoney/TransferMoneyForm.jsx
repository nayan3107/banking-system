import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  // Button,
  TextField,
  FormControl,
  InputAdornment,
  makeStyles,
  Typography,
  Select,
  Button,
} from '@material-ui/core';

import { setAlert } from '../../slices/alertSlice';
import { CheckFormikValues } from '../../components/Formik/CheckFormikValues';
import { FormContainer } from '../../components/FormContainer';
import { getAllCustomers } from '../../slices/customerSlice';
import Loader from '../../components/Loader/Loader';
import { ErrorMessage } from 'formik';
import { AttachMoney } from '@material-ui/icons';

const TransferMoneyForm = (props) => {
  const dispatch = useDispatch();
  const check = false;
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
  } = props;
  const {
    customer: { allCustomers, loading },
  } = useSelector((state) => {
    return {
      customer: state.customer,
    };
  }, shallowEqual);

  return (
    <FormContainer>
      <Typography align='center' variant='h3' gutterBottom>
        Transfer Money
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl style={{ marginBottom: '1rem', width: '100%' }}>
          <Select
            native
            // label='Select User'
            variant='outlined'
            name='sentTo'
            value={values.sentTo}
            error={errors.sentTo && touched.sentTo}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.sentTo && touched.sentTo && errors.sentTo}
          >
            <option>Which user you want to send money to?</option>
            {allCustomers
              .filter((customer) => customer._id !== values.sentFrom)
              .map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <div>
          {errors.sentTo && touched.sentTo ? <>{errors.sentTo}</> : null}
        </div>
        <FormControl style={{ marginBottom: '1rem', width: '100%' }}>
          <TextField
            type='number'
            variant='outlined'
            label='Transfer Money'
            placeholder='Enter Amount you want to transfer'
            name='amount'
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.amount && touched.amount}
            helperText={errors.amount && touched.amount && errors.amount}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl style={{ marginBottom: '1rem', width: '100%' }}>
          <TextField
            variant='outlined'
            label='Remark (Optional)'
            placeholder='Enter remark for your transaction'
            name='remark'
            value={values.remark}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.remark && touched.remark}
            helperText={errors.remark && touched.remark && errors.remark}
          />
        </FormControl>
        <Button
          loading={loading}
          type='submit'
          fullWidth
          variant='outlined'
          onClick={() => {
            if (!values.amount || !values.sentTo) {
              dispatch(
                setAlert('Please fill in the form properly!', 'warning')
              );
            }
          }}
          color='danger'
          round
        >
          Transfer Money
        </Button>

        {check ? <CheckFormikValues {...props} /> : ''}
      </form>
    </FormContainer>
  );
};

export default TransferMoneyForm;
