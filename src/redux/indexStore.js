import { configureStore } from '@reduxjs/toolkit';
import { tweetsAPI } from './tweetsApi';
import sliceUserKeyReducer from './sliceUserKey';
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

const userKeyPersistConfig = {
  key: 'userKey',
  storage,
  // blacklist: ['stateAllTweets'],
};

const store = configureStore({
  reducer: {
    storeUserKey: persistReducer(userKeyPersistConfig, sliceUserKeyReducer),
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
