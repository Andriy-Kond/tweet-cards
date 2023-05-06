import { createSlice } from '@reduxjs/toolkit';

const sliceUserKey = createSlice({
  name: 'userKey',

  initialState: {
    stateUserKey: [],
  },

  reducers: {
    toggleUserKey(state, action) {
      console.log('toggleUserKey >> action:', action);
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

    setUserKey(state, action) {
      state.stateUserKey.push(action.payload);
    },
    unSetUserKey(state, action) {
      state.stateUserKey = state.stateUserKey.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { setUserKey, unSetUserKey, toggleUserKey } = sliceUserKey.actions;

export default sliceUserKey.reducer;
