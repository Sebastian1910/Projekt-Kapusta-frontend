import React, { useState } from "react";
import "../styles/components/IncomeExpenseSwitch.scss";

// Lista kategorii
const categoryIcons = {
  income: {
    salary: "/frontend/src/assets/svg/salary 1.svg",
    add_income: "frontend/src/assets/svg/add_icome.svg",
  },
  expenses: {
    products: "/frontend/src/assets/svg/products.svg",
    alcohol: "/frontend/src/assets/svg/cocktail.svg",
    entertainment: "/frontend/src/assets/svg/kite.svg",
    health: "/frontend/src/assets/svg/hands-holding-heart.svg",
    transport: "/frontend/src/assets/svg/car.svg",
    housing: "/frontend/src/assets/svg/couch.svg",
    technique: "/frontend/src/assets/svg/tools 1.svg",
    communal_communication: "/frontend/src/assets/svg/invoice.svg",
    sports_hobbies: "/frontend/src/assets/svg/clay.svg",
    education: "/frontend/src/assets/svg/book.svg",
    other: "/frontend/src/assets/svg/other.svg",
  },
};

const IncomeExpenseSwitch = ({
  income = [],
  expenses = [],
  onCategoryClick,
}) => {
  const [currentSection, setCurrentSection] = useState("expenses");

  // Przekształcanie transakcji w obiekt zsumowanych wartości
  const sumTransactionsByCategory = (transactions, type) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const category = transaction.category.toLowerCase().replace(" ", "_");
      if (!acc[category]) acc[category] = 0;
      acc[category] += transaction.amount;
      return acc;
    }, {});

    return Object.keys(categoryIcons[type]).map((category) => ({
      name: category.replace("_", " "),
      value: Math.abs(grouped[category] || 0), // Zmieniamy wartości na dodatnie
    }));
  };

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
            onClick={() => onCategoryClick(item.name)} // Obsługa kliknięcia kategorii
          >
            <span>{item.value.toFixed(2)} UAH</span>
            <img
              src={
                categoryIcons[currentSection][
                  item.name.toLowerCase().replace(" ", "_")
                ] || "/assets/icons/default.svg"
              }
              alt={item.name}
              className="section-icon"
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="income-expense-switch">
      <div className="switch-header">
        <button
          onClick={() => setCurrentSection("expenses")}
          className="switch-arrow">
          <img
            src="/frontend/src/assets/svg/arrow-left.svg"
            alt="Previous section"
          />
        </button>
        <h3>{currentSection === "income" ? "INCOME" : "EXPENSES"}</h3>
        <button
          onClick={() => setCurrentSection("income")}
          className="switch-arrow">
          <img
            src="/frontend/src/assets/svg/arrow-right.svg"
            alt="Next section"
          />
        </button>
      </div>
      <div className="section-content">{renderContent()}</div>
    </div>
  );
};

export default IncomeExpenseSwitch;
