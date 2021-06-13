import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  // Button,
  TextField,
  FormControl,
  InputAdornment,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';

import { setAlert } from '../../slices/alertSlice';
import { CheckFormikValues } from '../../components/Formik/CheckFormikValues';
import { FormContainer } from '../../components/FormContainer';

const AddMoneyForm = (props) => {
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
    customer: { loading },
  } = useSelector((state) => {
    return {
      customer: state.customer,
    };
  }, shallowEqual);

  return (
    <FormContainer>
      <Typography align='center' variant='h3' gutterBottom>
        Add Money
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl style={{ marginBottom: '1rem', width: '100%' }}>
          <TextField
            type='number'
            variant='outlined'
            label='Add Money'
            placeholder='Enter Amount you want to add'
            name='amount'
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.amount && touched.amount}
            helperText={errors.amount && touched.amount && errors.amount}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <i class='fas fa-coins'></i>
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
            if (!values.amount) {
              dispatch(
                setAlert('Please fill in the form properly!', 'warning')
              );
            }
          }}
          color='danger'
          round
        >
          Add Money
        </Button>

        {check ? <CheckFormikValues {...props} /> : ''}
      </form>
    </FormContainer>
  );
};

export default AddMoneyForm;
