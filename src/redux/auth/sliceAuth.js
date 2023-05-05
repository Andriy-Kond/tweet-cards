import {
  fetchLogIn,
  fetchLogOut,
  fetchRegister,
  fetchCurrentUser,
} from './fetchAuth';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';

const initialState = {
  user: { name: null, email: null },
  token: null,
  // isLoggedIn: false, // замість нього використовую властивість token
  isRefreshing: false,
  isLoading: false,
  error: null,
};

// * Для скорочення коду в extraReducers:
// & Однакові загальні методи для всіх pending і всіх rejected
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// & register та login:
const authHandleFulfilled = (state, action) => {
  // state.isLoading = false; // переніс у handleFulfilled
  // state.error = null; // переніс у handleFulfilled
  // handleFulfilled(state) - можна викликати тут, а можна після всіх addMatcher в окремому addMatcher

  state.user = action.payload.user;
  state.token = action.payload.token;
  // state.isLoggedIn = true; // якщо успішна реєстрація
};

// & logout
const logOutHandleFulfilled = state => {
  state.user = { name: null, email: null };
  state.token = null;
  // state.isLoggedIn = false;
};

// & Оновлення сторінки
const refreshHandlePending = (state, action) => {
  state.isRefreshing = true;
};
const refreshHandleFulfilled = (state, action) => {
  state.user = action.payload;
  state.isRefreshing = false;
  // state.isLoggedIn = true;
};
const refreshHandleRejected = (state, action) => {
  state.isRefreshing = false;
};

// & Додаткове скорочення коду у всіх fulFilled:
const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};
// * /Для скорочення коду в extraReducers

// Оптимізація для скорочення назви у масиві функції isAnyOf([], callback)
// Створюємо масив з імен і додаємо до кожного якийсь статус, в залежності від ситуації
const namesArr = [fetchRegister, fetchLogIn, fetchLogOut];
const addStatusToName = status => namesArr.map(name => name[status]);

const sliceAuth = createSlice({
  // ! Ніякої логіки перевірки тут не мє бути! Лише отримати дані і засетити їх!

  name: 'auth',
  initialState,
  // обробляємо реєстрацію
  extraReducers: builder => {
    builder
      .addCase(fetchRegister.fulfilled, authHandleFulfilled)
      .addCase(fetchLogIn.fulfilled, authHandleFulfilled)
      .addCase(fetchLogOut.fulfilled, logOutHandleFulfilled)

      .addCase(fetchCurrentUser.pending, refreshHandlePending)
      .addCase(fetchCurrentUser.fulfilled, refreshHandleFulfilled)
      .addCase(fetchCurrentUser.rejected, refreshHandleRejected)

      .addMatcher(isAnyOf(...addStatusToName(PENDING)), handlePending)
      .addMatcher(isAnyOf(...addStatusToName(REJECTED)), handleRejected)
      // Ще одне покращення для скорочення коду:
      .addMatcher(isAnyOf(...addStatusToName(FULFILLED)), handleFulfilled);
  },
});

export default sliceAuth.reducer;
