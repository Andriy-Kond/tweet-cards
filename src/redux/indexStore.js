import { configureStore } from '@reduxjs/toolkit';
import { tweetsAPI } from './tweetsApi';
import sliceUsersReducer from './sliceUsers';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistStore from 'redux-persist/lib/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';

const usersPersistConfig = {
  key: 'users',
  storage,
};

const store = configureStore({
  reducer: {
    storeUsers: persistReducer(usersPersistConfig, sliceUsersReducer),
    [tweetsAPI.reducerPath]: tweetsAPI.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tweetsAPI.middleware),
});

export const persister = persistStore(store);
export default store;
