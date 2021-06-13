import API from './api';

export const getAllCustomers = async () => {
  try {
    const res = await API.get('/users');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getCustomer = async (id) => {
  try {
    const res = await API.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
