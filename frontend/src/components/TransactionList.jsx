import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  deleteTransaction,
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

  return (
    <div className="transaction-list">
      <h3>Twoje Transakcje</h3>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Typ</th>
            <th>Kategoria</th>
            <th>Opis</th>
            <th>Kwota</th>
            <th>Akcje</th>
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
