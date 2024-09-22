import axios from "axios";
import {
  addTransactionSuccess,
  deleteTransactionSuccess,
  fetchTransactionsSuccess,
} from "../reducers/transactionReducer";

export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await axios.post("/api/transactions", transaction, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(addTransactionSuccess(response.data));
  } catch (error) {
    console.error("Błąd podczas dodawania transakcji:", error);
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(deleteTransactionSuccess(id));
  } catch (error) {
    console.error("Błąd podczas usuwania transakcji:", error);
  }
};

export const fetchTransactions = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(fetchTransactionsSuccess(response.data));
  } catch (error) {
    console.error("Błąd podczas pobierania transakcji:", error);
  }
};
