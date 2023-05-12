import { createSlice } from '@reduxjs/toolkit';
import { ALL, FOLLOW, FOLLOWING } from 'Services/variables';

const sliceUsers = createSlice({
  name: 'users',

  initialState: {
    stateFollowingUsers: [],
    stateFilteredTweets: [],
    stateDownloadedTweets: [],
    stateFilter: ALL,
    stateCurrentPage: 1,
    stateTotalPages: 1,
    stateIsLoading: false,
  },

  reducers: {
    toggleUserSubscribe(state, action) {
      const isExist = state.stateFollowingUsers.find(
        contact => contact === action.payload
      );

      if (isExist) {
        state.stateFollowingUsers = state.stateFollowingUsers.filter(
          contact => contact !== action.payload
        );
      } else {
        state.stateFollowingUsers.push(action.payload);
      }
    },

    setFilteredTweets(state, action) {
      switch (state.stateFilter) {
        case ALL:
          state.stateFilteredTweets = action.payload;

          break;
        case FOLLOWING:
          state.stateFilteredTweets = action.payload.filter(tweet =>
            state.stateFollowingUsers.includes(tweet.id)
          );

          break;
        case FOLLOW:
          state.stateFilteredTweets = action.payload.filter(
            tweet => !state.stateFollowingUsers.includes(tweet.id)
          );
          break;

        default:
          break;
      }
    },

    setUsersFilter(state, action) {
      state.stateFilter = action.payload;
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

    setDownloadedTweets(state, action) {
      state.stateDownloadedTweets.push(...action.payload);
    },

    setIsLoading(state, action) {
      state.stateIsLoading = action.payload;
    },
  },
});

export const {
  toggleUserSubscribe,
  setFilteredTweets,
  setUsersFilter,
  setCurrentPage,
  incrementPage,
  decrementPage,
  setTotalPages,
  setDownloadedTweets,
  setIsLoading,
} = sliceUsers.actions;

export default sliceUsers.reducer;
