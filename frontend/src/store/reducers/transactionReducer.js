import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTransactionSuccess(state, action) {
      state.list.push(action.payload);
    },
    deleteTransactionSuccess(state, action) {
      state.list = state.list.filter((txn) => txn.id !== action.payload);
    },
    fetchTransactionsSuccess(state, action) {
      state.list = action.payload;
    },
  },
});

export const {
  addTransactionSuccess,
  deleteTransactionSuccess,
  fetchTransactionsSuccess,
} = transactionSlice.actions;

export default transactionSlice.reducer;
