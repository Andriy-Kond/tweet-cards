import { createSlice } from '@reduxjs/toolkit';
import { ALL, FOLLOW, FOLLOWING } from 'Services/variables';

const sliceUsers = createSlice({
  name: 'users',

  initialState: {
    stateFollowingUsers: [],
    // stateAllTweets: [], // замінено на stateDownloadedTweets
    stateDownloadedTweets: [],
    stateFilteredTweets: [],
    stateUsersFilter: ALL,
    stateCurrentPage: 1,
    stateTotalPages: 1,

    // new
    stateIsLoading: false,
    stateIsShowLoadMoreBtn: false,
    stateIsDisabledLoadMoreBtn: true,
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

    setFilteredTweets(state) {
      switch (state.stateUsersFilter) {
        case FOLLOWING:
          state.stateFilteredTweets =
            state.stateDownloadedTweets?.length > 0
              ? state.stateDownloadedTweets.filter(tweet =>
                  state.stateFollowingUsers.includes(tweet.id)
                )
              : [];
          break;
        case FOLLOW:
          state.stateFilteredTweets =
            state.stateDownloadedTweets?.length > 0
              ? state.stateDownloadedTweets.filter(
                  tweet => !state.stateFollowingUsers.includes(tweet.id)
                )
              : [];
          break;
        case ALL:
          state.stateFilteredTweets = state.stateDownloadedTweets;
          break;
        default:
          break;
      }
    },

    // setAllTweets(state, action) { // Замінено на setDownloadedTweets
    //   state.stateAllTweets = action.payload;
    // },

    setDownloadedTweets(state, action) {
      state.stateDownloadedTweets = action.payload;

      // if (state.stateDownloadedTweets.length > 0) {
      //   state.stateDownloadedTweets = [
      //     ...state.stateDownloadedTweets,
      //     ...action.payload,
      //   ];
      // }
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

    // new
    setIsLoading(state, action) {
      state.stateIsLoading = action.payload;
    },

    setIsShowLoadMoreBtn(state, action) {
      state.stateIsShowLoadMoreBtn = action.payload;
    },

    setIsDisabledLoadMoreBtn(state, action) {
      state.stateIsDisabledLoadMoreBtn = action.payload;
    },
  },
});

export const {
  toggleUserSubscribe,
  setFilteredTweets,
  // setAllTweets, // Замінено на setDownloadedTweets
  setDownloadedTweets,
  setUsersFilter,
  setCurrentPage,
  incrementPage,
  decrementPage,
  setTotalPages,

  // new
  setIsLoading,
  setIsShowLoadMoreBtn,
  setIsDisabledLoadMoreBtn,
} = sliceUsers.actions;

export default sliceUsers.reducer;
