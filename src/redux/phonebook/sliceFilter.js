import { createSlice } from '@reduxjs/toolkit';

const sliceFilter = createSlice({
  name: 'filter',

  initialState: {
    stateFilter: '',
  },

  reducers: {
    filterInStateContacts(state, action) {
      state.stateFilter = action.payload.value;
    },
  },
});

export const { filterInStateContacts } = sliceFilter.actions;

export default sliceFilter.reducer;
