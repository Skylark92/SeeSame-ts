import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import colorReducer from './colorSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLogin', 'user'],
};

const persist = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persist,
    color: colorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export const UseDispatch: () => Dispatch = useDispatch;

export default store;
