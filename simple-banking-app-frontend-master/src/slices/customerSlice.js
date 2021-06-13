import { setAlert } from './alertSlice';
import { createSlice } from '@reduxjs/toolkit';
import * as TRANSFER_REQUESTS from '../api/transferRequests';
import * as CUSTOMER_REQUESTS from '../api/userRequests';

const initialState = {
  allCustomers: null,
  filteredAllCustomers: null,
  customer: null,
  customerTransactions: null,
  lastTransaction: null,
  loading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setAllCustomers(state, action) {
      state.allCustomers = action.payload;
      state.filteredAllCustomers = action.payload;
      state.loading = false;
    },
    setCustomer(state, action) {
      state.customer = action.payload;
      state.loading = false;
    },
    setCustomerTransactions(state, action) {
      state.customerTransactions = action.payload;
      state.loading = false;
    },
    setLastTransaction(state, action) {
      state.lastTransaction = action.payload;
      state.loading = false;
    },
    setFilteredCustomers(state, action) {
      state.filteredAllCustomers =
        state.allCustomers !== null
          ? state.allCustomers.filter((customer) => {
              const regex = new RegExp(`${action.payload}`, 'gi');
              return customer.name.match(regex);
            })
          : null;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  setAllCustomers,
  setCustomer,
  setLastTransaction,
  setCustomerTransactions,
  setLoading,
  setFilteredCustomers,
} = customerSlice.actions;

export default customerSlice.reducer;

// Thunks

// get All Customers
export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const resData = await CUSTOMER_REQUESTS.getAllCustomers();
    const { success, data } = resData;
    if (success) {
      dispatch(setAllCustomers(data));
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};

// get Customer
export const getCustomer = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const resData = await CUSTOMER_REQUESTS.getCustomer(id);
    const { success, data } = resData;
    if (success) {
      dispatch(setCustomer(data));
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};

// get customer Transactions
export const getCustomerTransactions = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const resData = await TRANSFER_REQUESTS.getUserTransactions(id);
    const { success, data } = resData;
    console.log(data);
    if (success) {
      dispatch(setCustomerTransactions(data));
    }
  } catch (err) {
    dispatch(setLoading());
    // dispatch(setAlert(err.response.data.error, 'error'));
  }
};

// add amount
export const addAmount = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const resData = await TRANSFER_REQUESTS.addAmount(formData);
    const { success, data } = resData;
    if (success) {
      dispatch(setLastTransaction(data.transfer));
      dispatch(setAlert('Amount Added!', 'success'));
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert('Transaction Failed!', 'error'));
  }
};

// transfer amount
export const transferAmount = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const resData = await TRANSFER_REQUESTS.transferAmount(formData);
    const { success, data } = resData;
    if (success) {
      dispatch(setLastTransaction(data));
      dispatch(setAlert('Amount Transfered!', 'success'));
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert('Transaction Failed!', 'error'));
  }
};
