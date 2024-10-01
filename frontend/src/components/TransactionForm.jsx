import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/actions/transactionActions";
import { applyTransaction } from "../store/reducers/balanceReducer";
import "../styles/components/TransactionForm.scss";
import Dropdown from "./Dropdown";

import Calendar from "../assets/svg/calendar.svg";
import Calculator from "../assets/svg/calculator.svg";

const API_URL = import.meta.env.VITE_API_URL;

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  // Funkcja pobierająca kategorie z backendu
  const fetchCategories = async (transactionType) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/${transactionType}-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Błąd podczas pobierania kategorii:", error);
      setCategories([]);
    }
  };

  // useEffect do załadowania kategorii przy zmianie typu transakcji
  useEffect(() => {
    fetchCategories(type);
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      type,
      amount: type === "expense" ? -Math.abs(amount) : parseFloat(amount),
      category,
      date,
      description,
    };

    // Dispatch transakcji do store
    dispatch(addTransaction(transaction));

    // Zastosowanie transakcji do balansu
    dispatch(applyTransaction(transaction));

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
        <label className={type === "expense" ? "active" : ""}>
          <input
            type="radio"
            value="expense"
            checked={type === "expense"}
            onChange={() => setType("expense")}
          />
          Expense
        </label>
        <label className={type === "income" ? "active" : ""}>
          <input
            type="radio"
            value="income"
            checked={type === "income"}
            onChange={() => setType("income")}
          />
          Income
        </label>
      </div>
      <div className="inputs-container">
        <div>
          <label className="form-label">
            <img src={Calendar} className="label-icon" alt="calendar icon" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input input-date"
            />
          </label>
          <label className="form-label">
            <input
              type="text"
              value={description}
              placeholder="Product description"
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </label>
          <label className="form-label">
            <Dropdown
              options={categories}
              value={category}
              placeholder="Product category"
              onChange={(value) => setCategory(value)}
            />
          </label>
          <label className="form-label last-label">
            <img
              src={Calculator}
              className="label-icon-calc"
              alt="calendar icon"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0,00"
              className="form-input last-input"
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">
            Input
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="form-button-clear">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
