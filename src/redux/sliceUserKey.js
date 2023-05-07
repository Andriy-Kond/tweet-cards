import { createSlice } from '@reduxjs/toolkit';
import { ALL, FOLLOW, FOLLOWING } from 'Services/variables';

const sliceUserKey = createSlice({
  name: 'userKey',

  initialState: {
    stateUserKeys: [], // id
    stateAllTweets: [],
    stateFilteredTweets: [], // filtered tweets
    stateUsersFilter: ALL,
    stateCurrentPage: 1,
  },

  reducers: {
    toggleUserSubscribe(state, action) {
      const isExist = state.stateUserKeys.find(
        contact => contact === action.payload
      );

      if (isExist) {
        state.stateUserKeys = state.stateUserKeys.filter(
          contact => contact !== action.payload
        );
      } else {
        state.stateUserKeys.push(action.payload);
      }
    },

    setFilteredTweets(state, action) {
      switch (state.stateUsersFilter) {
        case FOLLOWING:
          state.stateFilteredTweets = state.stateAllTweets.filter(tweet =>
            state.stateUserKeys.includes(tweet.id)
          );
          break;
        case FOLLOW:
          state.stateFilteredTweets = state.stateAllTweets.filter(
            tweet => !state.stateUserKeys.includes(tweet.id)
          );
          break;
        case ALL:
          state.stateFilteredTweets = state.stateAllTweets;
          break;
        default:
          break;
      }

      // state.stateFilteredTweets = action.payload;
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
} = sliceUserKey.actions;

export default sliceUserKey.reducer;
