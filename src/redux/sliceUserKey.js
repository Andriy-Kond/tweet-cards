import { createSlice } from '@reduxjs/toolkit';

const sliceUserKey = createSlice({
  name: 'userKey',

  initialState: {
    stateUserKey: [],
    stateUsersCards: [],
    stateUsersFilter: 'all',
  },

  reducers: {
    toggleUserKey(state, action) {
      // console.log('toggleUserKey >> action:', action);
      const isExist = state.stateUserKey.find(
        contact => contact === action.payload
      );

      if (isExist) {
        state.stateUserKey = state.stateUserKey.filter(
          contact => contact !== action.payload
        );
      } else {
        state.stateUserKey.push(action.payload);
      }
    },

    setUsersCards(state, action) {
      state.stateUsersCards = action.payload;
    },

    setUsersFilter(state, action) {
      state.stateUsersFilter = action.payload;
    },
  },
});

export const { toggleUserKey, setUsersCards, setUsersFilter } =
  sliceUserKey.actions;

export default sliceUserKey.reducer;
