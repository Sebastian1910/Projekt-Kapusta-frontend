import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  fetchTransactions,
} from "../store/actions/transactionActions";
import "../styles/components/TransactionList.scss";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  // Dodajemy defensywne sprawdzenie, czy transactions to tablica
  if (!Array.isArray(transactions)) {
    console.error("Transactions is not an array:", transactions);
    return <p>Błąd: Dane transakcji są w niepoprawnym formacie.</p>;
  }

  return (
    <div className="transaction-list">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>category</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.type === "income" ? "Dochód" : "Wydatek"}</td>
              <td>{txn.category}</td>
              <td>{txn.description}</td>
              <td>{txn.amount.toFixed(2)} PLN</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(txn.id)}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
