import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  fetchTransactions,
} from "../store/actions/transactionActions";
import "../styles/components/TransactionList.scss";

import Delete from "../assets/svg/delete.svg";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.list);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  if (!Array.isArray(transactions)) {
    console.error("Transactions is not an array:", transactions);
    return <p>Błąd: Dane transakcji są w niepoprawnym formacie.</p>;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="transaction-list">
      <table className="transaction-table">
        <thead>
          <tr className="tr-header">
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Sum</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr className="tr-border" key={txn.id || txn._id || index}>
              <td>{formatDate(txn.date)}</td>

              <td>{txn.category}</td>
              <td>{txn.description}</td>
              <td
                className={`sum-content ${txn.type === "income" ? "sum-income" : "sum-expense"}`}>
                {txn.amount !== undefined && !isNaN(txn.amount)
                  ? `${txn.amount.toFixed(2)} UAH`
                  : "Brak danych"}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(txn.id || txn._id)}>
                  <img src={Delete} alt="Delete" className="delete-icon" />
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
