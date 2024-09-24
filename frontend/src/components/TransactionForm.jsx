import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/actions/transactionActions";
import "../styles/components/TransactionForm.scss";
import Dropdown from "./Dropdown";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");

  const categories = {
    expense: ["Jedzenie", "Transport", "Rozrywka"],
    income: ["Pensja", "Bonus", "Inne"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      type,
      amount: type === "expense" ? -Math.abs(amount) : parseFloat(amount),
      category,
      date,
      description,
    };
    dispatch(addTransaction(transaction));
    setAmount("");
    setCategory("");
    setDescription("");
  };

  const handleClear = () => {
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="type-switch">
        <label>
          <input
            type="radio"
            value="expense"
            checked={type === "expense"}
            onChange={() => setType("expense")}
          />
          Expense
        </label>
        <label>
          <input
            type="radio"
            value="income"
            checked={type === "income"}
            onChange={() => setType("income")}
          />
          Income
        </label>
      </div>

      <label className="form-label">
        Kwota:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Kategoria:
        <Dropdown
          options={categories[type]}
          value={category}
          onChange={(value) => setCategory(value)}
        />
      </label>

      <label className="form-label">
        Data:
        <input type="date" value={date} readOnly className="form-input" />
      </label>

      <label className="form-label">
        Opis:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="form-button">
          Zatwierdź
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="form-button-clear">
          Wyczyść
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
