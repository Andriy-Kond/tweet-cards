import { fetchContacts, addContact, deleteContact } from './fetchContacts';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';

const initialState = {
  stateContacts: [],
  isLoading: false,
  error: null,
};

// * Для скорочення коду extraReducers:
// & Однакові загальні методи для всіх pending і всіх rejected
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

// & під кожен fullFilled своя функція:
const fetchHandleFulfilled = (state, action) => {
  // state.isLoading = false;
  // state.error = null;

  // handleFulfilled(state) - можна викликати тут, а можна після всіх addMatcher в окремому addMatcher
  state.stateContacts = action.payload;
};

const addHandleFulfilled = (state, action) => {
  // state.isLoading = false;
  // state.error = null;
  state.stateContacts.push(action.payload);
};

const deleteHandleFulfilled = (state, action) => {
  // state.isLoading = false;
  // state.error = null;
  const index = state.stateContacts.findIndex(
    contact => contact.id === action.payload.id
  );
  state.stateContacts.splice(index, 1);
};

// & Додаткове скорочення коду у всіх fulFilled:
const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};
// * /Для скорочення коду extraReducers

// Оптимізація для скорочення назви у масиві функції isAnyOf([], callback)
// Створюємо масив з імен і додаємо до кожного якийсь статус, в залежності від ситуації
const namesArr = [fetchContacts, addContact, deleteContact];
const addStatusToName = status => namesArr.map(name => name[status]);

const sliceContacts = createSlice({
  name: 'fetchContacts',
  initialState,

  // ~ Новий метод: 'builder callback' notation
  extraReducers: builder => {
    builder
      // & Варіант 1 з addCase
      // .addCase(fetchContacts.pending, handlePending) // переніс у isAnyOf
      .addCase(fetchContacts.fulfilled, fetchHandleFulfilled)
      // .addCase(fetchContacts.rejected, handleRejected) // переніс у isAnyOf

      // .addCase(addContact.pending, handlePending) // переніс у isAnyOf
      .addCase(addContact.fulfilled, addHandleFulfilled)
      // .addCase(addContact.rejected, handleRejected) // переніс у isAnyOf

      // .addCase(deleteContact.pending, handlePending) // переніс у isAnyOf
      .addCase(deleteContact.fulfilled, deleteHandleFulfilled)
      // .addCase(deleteContact.rejected, handleRejected) // переніс у isAnyOf

      // isAnyOf працює як логічне АБО. Приймає масив.
      // Читається так: якщо хтось з перелічених з масиву, то роби колбек після коми

      // & Варіант 2 з addMatcher
      // .addMatcher(
      //   isAnyOf(
      //     fetchContacts.pending,
      //     addContact.pending,
      //     deleteContact.pending
      //   ),
      //   handlePending
      // )
      // .addMatcher(
      //   isAnyOf(
      //     fetchContacts.rejected,
      //     addContact.rejected,
      //     deleteContact.rejected
      //   ),
      //   handleRejected
      // );

      // & Варіант 3 - з додатковою функцією додавання статусу
      .addMatcher(isAnyOf(...addStatusToName(PENDING)), handlePending)
      .addMatcher(isAnyOf(...addStatusToName(REJECTED)), handleRejected)
      // Ще одне поращення для скорочення коду:
      .addMatcher(isAnyOf(...addStatusToName(FULFILLED)), handleFulfilled);
  },
});

export default sliceContacts.reducer;

// ! RTK Query:
// Нічого
