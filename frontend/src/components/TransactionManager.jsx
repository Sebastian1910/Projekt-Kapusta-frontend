import React, { useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const TransactionManager = () => {
  const [selectedType, setSelectedType] = useState("income"); // Domyślnie przychody

  return (
    <div>
      {/* Przycisk do przełączania między przychodami a wydatkami */}
      <div className="button-group">
        <button onClick={() => setSelectedType("income")}>INCOME</button>
        <button onClick={() => setSelectedType("expense")}>EXPENSE</button>
      </div>

      {/* Form i lista transakcji */}
      <TransactionForm selectedType={selectedType} />
      <TransactionList selectedType={selectedType} />
    </div>
  );
};

export default TransactionManager;
