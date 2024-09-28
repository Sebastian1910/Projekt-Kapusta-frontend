import React from "react";
import "../styles/components/SummaryHeader.scss";

const SummaryHeader = ({ expenses = 0, income = 0 }) => {
  return (
    <div className="summary-header">
      <div className="summary-item">
        <span className="label">Expenses:</span>
        <span
          className={`value expenses-value ${expenses < 0 ? "negative" : ""}`}>
          - {Math.abs(expenses).toFixed(2)} UAH
        </span>
      </div>
      <div className="summary-item">
        <span className="label">Income:</span>
        <span className={`value income-value ${income > 0 ? "positive" : ""}`}>
          + {income.toFixed(2)} UAH
        </span>
      </div>
    </div>
  );
};

export default SummaryHeader;
