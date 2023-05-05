// ^ З використанням localStorage:
import { configureStore } from '@reduxjs/toolkit';

// імпорт при default-експорті дозволяє називати змінну як завгодно:
import sliceFilterReducer from './phonebook/sliceFilter';
import sliceContactsReducer from './phonebook/sliceContacts';
import sliceAuthReducer from './auth/sliceAuth';

import {
  persistStore,
  persistReducer,
  // ~ Додаткові константи, щоби позбутись помилки у консолі - необхідні для роботи Redux-Persist
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Додатковий імпорт згідно документації для роботи з localStorage:
import storage from 'redux-persist/lib/storage';

// * Для роботи з бекендом вже немає необхідності юзати локалсторидж для контактів:
// // Об'являю спеціальне Redux-Persist сховище (спеціальний localStorage):
// const contactsPersistConfig = {
//   key: 'root', // ключ, необхідний для того, щоб можна було створювати декілька таких сховищ (вкладених???)
//   storage, // storage: storage, - це storage з імпорту: import storage from 'redux-persist/lib/storage';
//   whitelist: ['stateContacts'], // дозволяю зберігати у локальному сховищі тільки це
// };

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'], // дозволяю зберігати у локальному сховищі тільки цей ключ з цілого об'єкту sliceAuth.initialState
};

// ~ Додатковий middleware, щоби позбутись помилки у консолі - необхідно для роботи Redux-Persist
const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    // якісь перевірки для серилізації:
    serializableCheck: {
      // якісь екшени, які будуть ігноруватись:
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

// Глобальний стор Redux виношу у окрему змінну:
const storeRedux = configureStore({
  reducer: {
    // storeContacts: persistReducer(contactsPersistConfig, sliceContactsReducer),
    storeAuth: persistReducer(authPersistConfig, sliceAuthReducer),
    storeContacts: sliceContactsReducer,
    storeFilter: sliceFilterReducer,
  },

  // ~ Додатковий middleware, щоби позбутись помилки у консолі - необхідно для роботи Redux-Persist
  middleware, // middleware: middleware,
});

// Пов'язую створене Redux-Persist сховище з глобальним Redux стором:
export const persister = persistStore(storeRedux); // Маю передати його до компоненту <PersistGate> у кореневому index.js

export default storeRedux;
