import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchReportsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReportsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchReportsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchReportsRequest, fetchReportsSuccess, fetchReportsFailure } =
  reportSlice.actions;

export default reportSlice.reducer;
