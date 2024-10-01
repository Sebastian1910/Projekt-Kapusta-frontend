import React from "react";
import "../styles/components/Summary.scss";

// Funkcja grupująca transakcje według miesięcy
const groupByMonth = (transactions) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).getMonth();
    if (!acc[month]) acc[month] = 0;
    acc[month] += transaction.amount;
    return acc;
  }, {});
  return grouped;
};

// Komponent wyświetlający podsumowanie
const Summary = ({ transactions }) => {
  const monthlySummary = groupByMonth(transactions);

  return (
    <div className="summary">
      <h2>SUMMARY</h2>
      <ul>
        {Object.entries(monthlySummary).map(([month, total]) => (
          <li key={month} className="transaction-item">
            <span className="month-name">
              {new Date(2024, month).toLocaleString("default", {
                month: "long",
              })}
            </span>
            <span className="total-amount">{total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
