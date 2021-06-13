import { combineReducers } from 'redux';
import alertReducer from './alertSlice';
import customerReducer from './customerSlice';

const rootReducer = combineReducers({
  alert: alertReducer,
  customer: customerReducer,
});

export default rootReducer;
