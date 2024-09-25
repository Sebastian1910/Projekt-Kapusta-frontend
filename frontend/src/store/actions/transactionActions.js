import axios from "axios";
import {
  addTransactionSuccess,
  deleteTransactionSuccess,
  fetchTransactionsSuccess,
} from "../reducers/transactionReducer";

// Dodanie transakcji (dochodów lub wydatków)
export const addTransaction = (transaction) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/transaction",
      transaction,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log("Added transaction:", response.data);
    dispatch(addTransactionSuccess(response.data.transaction));
  } catch (error) {
    console.error("Błąd podczas dodawania transakcji:", error);
  }
};

// Usunięcie transakcji
export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/transaction/${id}`, {
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

// Pobranie wszystkich transakcji
export const fetchTransactions = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/transaction", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (Array.isArray(response.data.transactions)) {
      console.log("Fetched transactions:", response.data.transactions);
      dispatch(fetchTransactionsSuccess(response.data.transactions));
    } else {
      console.error("Oczekiwano tablicy, ale otrzymano:", response.data);
    }
  } catch (error) {
    console.error("Błąd podczas pobierania transakcji:", error);
  }
};

// Pobranie dochodów
export const fetchIncomeTransactions = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/transaction/income",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (Array.isArray(response.data.transactions)) {
      console.log("Fetched income transactions:", response.data.transactions);
      dispatch(fetchTransactionsSuccess(response.data.transactions));
    } else {
      console.error("Oczekiwano tablicy, ale otrzymano:", response.data);
    }
  } catch (error) {
    console.error("Błąd podczas pobierania dochodów:", error);
  }
};

// Pobranie wydatków
export const fetchExpenseTransactions = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/transaction/expense",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (Array.isArray(response.data.transactions)) {
      console.log("Fetched expense transactions:", response.data.transactions);
      dispatch(fetchTransactionsSuccess(response.data.transactions));
    } else {
      console.error("Oczekiwano tablicy, ale otrzymano:", response.data);
    }
  } catch (error) {
    console.error("Błąd podczas pobierania wydatków:", error);
  }
};
