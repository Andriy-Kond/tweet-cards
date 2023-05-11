import { createSlice } from '@reduxjs/toolkit';
import { ALL, FOLLOW, FOLLOWING } from 'Services/variables';

const sliceUsers = createSlice({
  name: 'users',

  initialState: {
    stateUsers: [],
    stateAllTweets: [],
    stateFilteredTweets: [],
    stateUsersFilter: ALL,
    stateCurrentPage: 1,
    stateTotalPages: 1,
  },

  reducers: {
    toggleUserSubscribe(state, action) {
      const isExist = state.stateUsers.find(
        contact => contact === action.payload
      );

      if (isExist) {
        state.stateUsers = state.stateUsers.filter(
          contact => contact !== action.payload
        );
      } else {
        state.stateUsers.push(action.payload);
      }
    },

    setFilteredTweets(state) {
      switch (state.stateUsersFilter) {
        case FOLLOWING:
          state.stateFilteredTweets =
            state.stateAllTweets?.length > 0
              ? state.stateAllTweets.filter(tweet =>
                  state.stateUsers.includes(tweet.id)
                )
              : [];
          break;
        case FOLLOW:
          state.stateFilteredTweets =
            state.stateAllTweets?.length > 0
              ? state.stateAllTweets.filter(
                  tweet => !state.stateUsers.includes(tweet.id)
                )
              : [];
          break;
        case ALL:
          state.stateFilteredTweets = state.stateAllTweets;
          break;
        default:
          break;
      }
    },

    setAllTweets(state, action) {
      state.stateAllTweets = action.payload;
    },

    setUsersFilter(state, action) {
      state.stateUsersFilter = action.payload;
    },

    setCurrentPage(state, action) {
      state.stateCurrentPage = action.payload;
    },

    incrementPage: state => {
      state.stateCurrentPage += 1;
    },
    decrementPage: state => {
      state.stateCurrentPage -= 1;
    },

    setTotalPages(state, action) {
      state.stateTotalPages = action.payload;
    },
  },
});

export const {
  toggleUserSubscribe,
  setFilteredTweets,
  setAllTweets,
  setUsersFilter,
  setCurrentPage,
  incrementPage,
  decrementPage,
  setTotalPages,
} = sliceUsers.actions;

export default sliceUsers.reducer;
