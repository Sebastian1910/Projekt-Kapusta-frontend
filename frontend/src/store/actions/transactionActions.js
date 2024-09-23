import axios from "axios";
import {
  addTransactionSuccess,
  deleteTransactionSuccess,
  fetchTransactionsSuccess,
} from "../reducers/transactionReducer";

// Dodanie transakcji
export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/transactions",
      transaction,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log("Added transaction:", response.data);
    dispatch(addTransactionSuccess(response.data));
  } catch (error) {
    console.error("Błąd podczas dodawania transakcji:", error);
  }
};

// Usunięcie transakcji
export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(`Deleted transaction with id: ${id}`);
    dispatch(deleteTransactionSuccess(id));
  } catch (error) {
    console.error("Błąd podczas usuwania transakcji:", error);
  }
};

// Pobranie transakcji
export const fetchTransactions = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/transactions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Sprawdzenie, czy dane są w postaci tablicy
    if (Array.isArray(response.data)) {
      console.log("Fetched transactions:", response.data);
      dispatch(fetchTransactionsSuccess(response.data));
    } else {
      console.error("Oczekiwano tablicy, ale otrzymano:", response.data);
    }
  } catch (error) {
    console.error("Błąd podczas pobierania transakcji:", error);
  }
};
