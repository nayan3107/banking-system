import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertInReducer(state, action) {
      return [...state, action.payload];
    },
    removeAlertInReducer(state, action) {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlertInReducer, removeAlertInReducer } = alertSlice.actions;

export default alertSlice.reducer;

// Thunk
export const setAlert = (msg, alertType) => async (dispatch) => {
  const id = uuid();
  dispatch(setAlertInReducer({ msg, alertType, id }));

  setTimeout(() => {
    dispatch(removeAlertInReducer(id));
  }, 4000);
};
