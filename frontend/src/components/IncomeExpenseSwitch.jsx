import React, { useState } from "react";
import "../styles/components/IncomeExpenseSwitch.scss";

import Previous_section from "../assets/svg/arrow-left.svg";
import Next_section from "../assets/svg/arrow-right.svg";

import salary from "../assets/svg/salary 1.svg";
import add_income from "../assets/svg/add_icome.svg";

import products from "../assets/svg/products.svg";
import alcohol from "../assets/svg/cocktail.svg";
import entertainment from "../assets/svg/kite.svg";
import health from "../assets/svg/hands-holding-heart.svg";
import transport from "../assets/svg/car.svg";
import housing from "../assets/svg/couch.svg";
import technique from "../assets/svg/tools 1.svg";
import communal_communication from "../assets/svg/invoice.svg";
import sports_hobbies from "../assets/svg/clay.svg";
import education from "../assets/svg/book.svg";
import other from "../assets/svg/other.svg";

// Lista kategorii z odpowiednimi ikonami
const categoryIcons = {
  income: {
    salary: salary,
    add_income: add_income,
  },
  expenses: {
    products: products,
    alcohol: alcohol,
    entertainment: entertainment,
    health: health,
    transport: transport,
    housing: housing,
    technique: technique,
    communal_communication: communal_communication,
    sports_hobbies: sports_hobbies,
    education: education,
    other: other,
  },
};

const IncomeExpenseSwitch = ({
  income = [],
  expenses = [],
  onCategoryClick,
}) => {
  const [currentSection, setCurrentSection] = useState("expenses");

  // Funkcja sumująca transakcje według kategorii
  const sumTransactionsByCategory = (transactions, type) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const category = transaction.category.toLowerCase().replace(" ", "_");
      if (!acc[category]) acc[category] = 0;
      acc[category] += transaction.amount;
      return acc;
    }, {});

    return Object.keys(categoryIcons[type]).map((category) => ({
      name: category.replace("_", " "),
      value: Math.abs(grouped[category] || 0),
    }));
  };

  // Renderowanie danych w zależności od sekcji
  const renderContent = () => {
    const data =
      currentSection === "income"
        ? sumTransactionsByCategory(income, "income")
        : sumTransactionsByCategory(expenses, "expenses");

    return (
      <div className="section-grid">
        {data.map((item, index) => (
          <div
            key={index}
            className="section-category"
            onClick={() => onCategoryClick(item.name)}>
            <span className="item-value">{item.value.toFixed(2)} UAH</span>
            <div className="icon-bg"></div>
            <img
              src={
                categoryIcons[currentSection][
                  item.name.toLowerCase().replace(" ", "_")
                ] || "/assets/icons/default.svg"
              }
              alt={item.name}
              className="section-icon"
            />
            <p className="item-name">{item.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="income-expense-switch">
      <div className="switch-header">
        {/* Przełączanie na sekcję 'expenses' */}
        <button
          onClick={() => setCurrentSection("expenses")}
          className="switch-arrow">
          <img src={Previous_section} alt="Previous section" />
        </button>
        <h3>{currentSection === "income" ? "INCOME" : "EXPENSES"}</h3>
        {/* Przełączanie na sekcję 'income' */}
        <button
          onClick={() => setCurrentSection("income")}
          className="switch-arrow">
          <img src={Next_section} alt="Next section" />
        </button>
      </div>
      <div className="section-content">{renderContent()}</div>
    </div>
  );
};

export default IncomeExpenseSwitch;
