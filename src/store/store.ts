import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AuthReducer from './auth/AuthSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import OrganisationReucer from './organisation/OrganisationSlice';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const store = configureStore({
  reducer: {
    customizer: persistReducer<any>(
      {
        key: 'customizer',
        storage,
      },
      CustomizerReducer
    ),
    auth: persistReducer<any>(
      {
        key: 'auth',
        storage,
      },
      AuthReducer
    ),
    organisation: OrganisationReucer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  auth: AuthReducer,
  organisation: OrganisationReucer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
