export const selectContacts = store => store.storeContacts.stateContacts;
export const selectIsLoading = store => store.storeContacts.isLoading;
export const selectError = store => store.storeContacts.error;
export const selectFilter = store => store.storeFilter.stateFilter; // Contacts.jsx, Filter.jsx

// ! RTK Query:
// export const selectFilter = store => store.storeFilter.stateFilter; // Contacts.jsx, Filter.jsx
