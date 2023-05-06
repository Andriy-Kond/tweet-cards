// ^ Без використання localStorage:
import { configureStore } from '@reduxjs/toolkit';
import sliceFilterReducer from './filterSlice';
import { tweetsAPI } from './tweetsApi';

import sliceUserKeyReducer from './sliceUserKey';

// Додатковий імпорт згідно документації для роботи з localStorage:
import storage from 'redux-persist/lib/storage';

import {
  // ~ Додаткові константи, щоби позбутись помилки у консолі - необхідні для роботи Redux-Persist
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
  whitelist: ['stateUserKey'], // дозволяю зберігати у локальному сховищі тільки цей ключ з цілого об'єкту sliceAuth.initialState
};

// ~ Для RTKQuery в Store передаємо ще один middleware, а редюсер передаємо трохи по-іншому
const store = configureStore({
  reducer: {
    // Задаємо будь-яке ім'я, бо був export default:
    storeFilter: sliceFilterReducer,
    storeUserKey: persistReducer(userKeyPersistConfig, sliceUserKeyReducer),
    // Додавання редюсера через RTK Query трохи по-іншому:
    [tweetsAPI.reducerPath]: tweetsAPI.reducer,
  },

  // Для RTK Query потрібен додатковий middleware:
  // middleware взагалі є масивом. Тому треба робити concat для того, щоб додати додатковий middleware з RTKQueryApi до цього основного масиву
  // getDefaultMiddleware - спеціальний метод
  // ~ Додатковий middleware, щоби позбутись помилки у консолі - необхідно для роботи Redux-Persist
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // якісь перевірки для серилізації:
      serializableCheck: {
        // якісь екшени, які будуть ігноруватись:
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(tweetsAPI.middleware),
  // розпушувати масив не рекомендується, бо деякі компоненти з попередніх трьох middleware, які під капотом можуть втратитись.
  // Тому Redux просить ось так НЕ робити: middleware: getDefaultMiddleware => [...getDefaultMiddleware(), RTKQueryApi.middleware]
});

// Пов'язую створене Redux-Persist сховище з глобальним Redux стором:
export const persister = persistStore(store); // Маю передати його до компоненту <PersistGate> у кореневому index.js
export default store;
