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
  },
});

export const { updateBalance } = balanceSlice.actions;

// Eksportujemy reduktor jako eksport domyślny
export default balanceSlice.reducer;
