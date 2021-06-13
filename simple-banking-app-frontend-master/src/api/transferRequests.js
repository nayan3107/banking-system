import API from './api';

export const getUserTransactions = async (id) => {
  try {
    const res = await API.get(`/transfers/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const addAmount = async (formData) => {
  try {
    const res = await API.post('/transfers/add', formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const transferAmount = async (formData) => {
  try {
    const res = await API.post('/transfers', formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};
