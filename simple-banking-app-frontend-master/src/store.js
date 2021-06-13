import rootReducer from './slices/index';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
