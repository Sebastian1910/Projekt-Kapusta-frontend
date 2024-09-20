// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import balanceReducer from "./reducers/balanceReducer";
import transactionReducer from "./reducers/transactionReducer";
import reportReducer from "./reducers/reportReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    transactions: transactionReducer,
    reports: reportReducer,
  },
});

export default store;
