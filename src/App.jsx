import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { fetchCurrentUser } from 'redux/auth/fetchAuth';
// import { selectIsLoggedIn } from 'redux/auth/selectors';

import HomePage from 'pages/Home/HomePage';
import SharedLayout from './Layout/SharedLayout';
import PrivateRoute from './components/PrivatRoute/PrivatRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import { selectIsRefreshing } from 'redux/auth/selectors';
import { BigPreLoader } from './components/Preloader/PreLoader';

const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage/NotFoundPage')
);
const RegisterPage = lazy(() => import('pages/Register/RegisterPage'));
const LoginPage = lazy(() => import('pages/Login/LoginPage'));
const ContactsPage = lazy(() => import('pages/Contacts/ContactsPage'));

export const App = () => {
  // * Логіка для обробки токена при перезавантаженні сторінки:
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  // */ Логіка для обробки токена при перезавантаженні сторінки:

  const isFetching = useSelector(selectIsRefreshing);
  // const isToken = useSelector(selectUserToken);
  // /         - ПУБЛІЧНИЙ НЕОБМЕЖЕНИЙ маршрут
  // /register - ПУБЛІЧНИЙ ОБМЕЖЕНИЙ маршрут реєстрації нового користувача з формою
  // /login    - ПУБЛІЧНИЙ ОБМЕЖЕНИЙ маршрут логіна існуючого користувача з формою
  // /contacts - ПРИВАТНИЙ маршрут для роботи зі списком контактів користувача

  return isFetching ? (
    <BigPreLoader />
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/contacts" element={<ContactsPage />} /> */}

        {/* <Route
            index
            element={<PublicRoute redirectTo="/" component={<HomePage />} />}
            /> */}

        <Route index element={<HomePage />} />

        <Route
          path="/register"
          element={
            <PublicRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
              restricted
            />
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute
              redirectTo="/contacts"
              component={<LoginPage />}
              restricted
            />
          }
        />

        <Route
          path="/contacts"
          element={
            // ^ Варіант 1
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />

            // ^ Варіант 2
            // <PrivateRoute component={<ContactsPage />} />

            // ^ Варіант 3
            // <PrivateRoute>
            //   <ContactsPage />
            // </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  );
};

// ! RTK Query:
// import { UserForm } from './UserForm/UserForm';
// import { Contacts } from './Contacts/Contacts';
// import { Filter } from './Filter/Filter';
// import css from './App.module.css';
// import { BigPreLoader } from './Preloader/PreLoader';

// // ^ Рефакторінг у RTK Query
// import { useGetContactsQuery } from 'store/contactsRTKQueryApi';

// export const App = () => {
//   // * При використанні RTK Query:
//   // const data = useGetContactsQuery();
//   // console.log('UserForm >> data:', data);
//   const { isLoading, isError: error } = useGetContactsQuery();

//   // Повертаю розмітку:
//   return (
//     <div className={css.mainContainer}>
//       <h1>Phonebook</h1>
//       <UserForm />
//       <h2>Contacts</h2>
//       <Filter />
//       <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
//         {isLoading && !error && <BigPreLoader />}
//       </div>

//       <Contacts />
//       {error && <h2>Error: {error}</h2>}
//     </div>
//   );
// };
