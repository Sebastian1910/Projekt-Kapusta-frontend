import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    updateBalance(state, action) {
      state.amount = action.payload;
    },
    updateBalanceSuccess(state, action) {
      state.amount = action.payload.amount;
    },
    applyTransaction(state, action) {
      const { type, amount } = action.payload;
      if (type === "expense") {
        state.amount -= Math.abs(amount);
      } else if (type === "income") {
        state.amount += Math.abs(amount);
      }
    },
  },
});

export const { updateBalance, updateBalanceSuccess, applyTransaction } =
  balanceSlice.actions;

export default balanceSlice.reducer;
