import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/actions/transactionActions";
import "../styles/components/TransactionForm.scss";
import Dropdown from "./Dropdown";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]); // State dla kategorii

  // Funkcja pobierająca kategorie z backendu
  const fetchCategories = async (transactionType) => {
    try {
      const token = localStorage.getItem("token"); // Pobieramy token z localStorage
      console.log(`Token z localStorage: ${token}`); // Log do sprawdzenia tokenu
      const response = await axios.get(
        `http://localhost:5000/api/${transactionType}-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Dodajemy token do nagłówków
          },
        },
      );
      console.log(`Pobrane kategorie dla ${transactionType}:`, response.data); // Log danych z backendu
      // Zabezpieczenie, że ustawiamy kategorie tylko, jeśli odpowiedź jest tablicą
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Błąd podczas pobierania kategorii:", error);
      setCategories([]); // Ustaw pustą tablicę w przypadku błędu
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
      <div>
        <label className="form-label">
          <img
            src="frontend/src/assets/svg/calendar.svg"
            className="label-icon"
            alt="calendar icon"
          />
          <input
            type="date"
            value={date}
            readOnly
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
        <label className="form-label">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="0,00"
            className="form-input"
          />
        </label>

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
