export const selectFollowingUsers = store =>
  store.storeUsers.stateFollowingUsers;
export const selectFilteredTweets = store =>
  store.storeUsers.stateFilteredTweets;
export const selectDownloadedTweets = store =>
  store.storeUsers.stateDownloadedTweets;

export const selectUsersFilter = store => store.storeUsers.stateUsersFilter;
export const selectCurrentPage = store => store.storeUsers.stateCurrentPage;
export const selectTotalPages = store => store.storeUsers.stateTotalPages;

// new
export const selectIsLoading = store => store.storeUsers.stateIsLoading;
export const selectIsShowLoadMoreBtn = store =>
  store.storeUsers.stateIsShowLoadMoreBtn;
export const selectIsDisabledLoadMoreBtn = store =>
  store.storeUsers.stateIsDisabledLoadMoreBtn;
