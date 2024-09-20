import { createAction } from "@reduxjs/toolkit";

// Definiuj i eksportuj akcję addTransaction
export const addTransaction = (transaction) => async (dispatch) => {
  try {
    // Ponieważ backend nie jest podłączony, możemy symulować odpowiedź
    // Tymczasowo dodajemy transakcję bezpośrednio
    dispatch(addTransactionSuccess(transaction));
  } catch (error) {
    console.error("Błąd podczas dodawania transakcji:", error);
  }
};
export const deleteTransaction = (id) => (dispatch) => {
  try {
    // Symulujemy usunięcie transakcji
    dispatch(deleteTransactionSuccess(id));
  } catch (error) {
    console.error("Błąd podczas usuwania transakcji:", error);
  }
};
export const fetchTransactions = () => (dispatch) => {
  try {
    // Symulowane dane
    const data = [
      {
        id: 1,
        date: "2023-10-01",
        type: "income",
        category: "Pensja",
        description: "Wypłata",
        amount: 5000,
      },
      {
        id: 2,
        date: "2023-10-05",
        type: "expense",
        category: "Jedzenie",
        description: "Zakupy spożywcze",
        amount: -150,
      },
    ];
    dispatch(fetchTransactionsSuccess(data));
  } catch (error) {
    console.error("Błąd podczas pobierania transakcji:", error);
  }
};
