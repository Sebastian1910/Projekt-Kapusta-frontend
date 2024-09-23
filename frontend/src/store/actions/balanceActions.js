import axios from "axios";
import { updateBalanceSuccess } from "../reducers/balanceReducer";

export const updateBalance = (amount) => async (dispatch) => {
  try {
    const response = await axios.patch(
      "/api/balance",
      { amount },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    dispatch(updateBalanceSuccess(response.data));
  } catch (error) {
    console.error("Błąd podczas aktualizacji bilansu:", error);
  }
};
