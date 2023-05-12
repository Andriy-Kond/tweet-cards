export const selectFollowingUsers = store =>
  store.storeUsers.stateFollowingUsers;
export const selectFilteredTweets = store =>
  store.storeUsers.stateFilteredTweets;
export const selectFilter = store => store.storeUsers.stateFilter;
export const selectCurrentPage = store => store.storeUsers.stateCurrentPage;
export const selectTotalPages = store => store.storeUsers.stateTotalPages;
export const selectDownloadedTweets = store =>
  store.storeUsers.stateDownloadedTweets;

export const selectIsLoading = store => store.storeUsers.stateIsLoading;
