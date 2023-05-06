// export const selectContacts = store => store.storeAsyncThunk.stateContacts;
// export const selectIsLoading = store => store.storeAsyncThunk.isLoading;
// export const selectError = store => store.storeAsyncThunk.error;
export const selectFilter = store => store.storeFilter.stateFilter; // Contacts.jsx, Filter.jsx
export const selectUserKey = store => store.storeUserKey.stateUserKey;
export const selectUsersCards = store => store.storeUserKey.stateUsersCards;
export const selectUsersFilter = store => store.storeUserKey.stateUsersFilter;
