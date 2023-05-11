export const selectUsers = store => store.storeUsers.stateUsers;
export const selectFilteredTweets = store =>
  store.storeUsers.stateFilteredTweets;
export const selectAllTweets = store => store.storeUsers.stateAllTweets;
export const selectUsersFilter = store => store.storeUsers.stateUsersFilter;
export const selectCurrentPage = store => store.storeUsers.stateCurrentPage;
export const selectTotalPages = store => store.storeUsers.stateTotalPages;
