import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// Для всіх операцій пов'язаних з конкретним користувачем бекенди стандартно чекають такий заголовок:
// Authorization: 'Bearer токен'
// Щоб не додавати його до кожної операції окремо використовую axios:
const tokenFn = {
  set(token) {
    // common - додати в будь-яку операцію запиту
    // axios.defaults.headers.post.Authorization - тільки на post-запити
    // axios.defaults.headers.get.Authorization - тільки на get-запити
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};
//  Якщо те писати на fetch, то було б щось таке на КОЖНИЙ запит:
// fetch('url', {
//   method: 'POST',
//   header: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    // credentials - об'єкт з властивостями:
    // {
    //   "name": "string",
    //   "email": "string",
    //   "password": "string",
    // }
    // Треба кидати рядок, але axios одразу робить stringify, тому можна просто закидувати об'єкт, а axios приведе його до рядку.
    try {
      // Відправляю дані клієнта на бекенд для реєстрації
      const response = await axios.post('users/signup', credentials);
      // Після запиту бекенд формує pending/fulfilled/rejected

      // data повертає:
      // {
      //   user: {
      //     name: "string",
      //     email: "string",
      //   },
      //   token: "string"
      // }

      // ^ два варіанти - через функцію tokenFn і напряму:
      tokenFn.set(response.data.token); // сетимо токен, далі axios буде його використовувати самостійно
      // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    // credentials - об'єкт з властивосями:
    // {
    //   "email": "string",
    //   "password": "string",
    // }
    try {
      // Відправляю дані клієнта на бекенд для аутентифікації
      const response = await axios.post('/users/login', credentials);
      // Після запиту бекенд формує pending/fulfilled/rejected

      // ^ два варіанти - через функцію tokenFn і напряму:
      tokenFn.set(response.data.token);
      // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogOut = createAsyncThunk(
  'auth/logout',
  async (token, { rejectWithValue }) => {
    // credentials - об'єкт з властивосями:
    // {
    //   "email": "string",
    //   "password": "string",
    // }
    try {
      // Відправляю дані клієнта на бекенд для аутентифікації
      // Не зрозуміло чи потребен token - працює і без нього, хоча в документації він ніби потрібен
      const response = await axios.post('/users/logout', token);
      // Після запиту бекенд формує pending/fulfilled/rejected

      // ^ два варіанти - через функцію tokenFn і напряму:
      // axios.defaults.headers.common.Authorization = '';
      tokenFn.unset();

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// thunkAPI.getState() - повертає весь Redux-стан повністю
export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    // credentials - об'єкт з властивосями:
    // {
    //   "email": "string",
    //   "password": "string",
    // }
    const state = getState();
    const receivedToken = state.storeAuth.token;

    if (receivedToken === null) {
      // retrun; - так працювати не буде - у токен буде залітати undefined при розлогіненому юзері. І тоді все падає.
      // Тому виходити з коду треба через відхилення:
      return rejectWithValue(
        'Нема токена - нема юзера. На все добре, до побачення'
      );
    }

    try {
      tokenFn.set(receivedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// USER
// POST   /users​/signup    Create a new user
// POST ​  /users​/login     Login user
// POST ​  /users​/logout    Log out user

// User{
// id	string Backend-generated unique identifier.
// name*	string Username.
// email*	string E-mail address.
// password*	string Password.
// }
// example: OrderedMap { "name": "Adrian Cross", "email": "across@mail.com", "password": "examplepwd12345" }

// CONTACT
// GET ​    /contacts         Get all user contacts
// POST ​   /contacts         Create a new contact
// DELETE ​ /contacts​/{contactId}    Delete contact.
// PATCH ​  /contacts​/{contactId}    Update an existing contact

// Contact{
// id	string Backend-generated unique identifier.
// name*	string Contact name.
// number*	string Phone number of the contact.
// }
// example: OrderedMap { "name": "Jacob Mercer", "number": "761-23-96" }
