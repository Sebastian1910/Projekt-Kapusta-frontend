import React, { useState, useEffect } from "react";
import "../styles/components/IncomeExpenseSwitch.scss";

const categoryIcons = {
  income: {
    salary: "/frontend/src/assets/svg/salary.svg",
    add_income: "/frontend/src/assets/svg/add_income.svg",
  },
  expenses: {
    products: "/frontend/src/assets/svg/products.svg",
    alcohol: "/frontend/src/assets/svg/alcohol.svg",
    entertainment: "/frontend/src/assets/svg/entertainment.svg",
    health: "/frontend/src/assets/svg/health.svg",
    transport: "/frontend/src/assets/svg/transport.svg",
    housing: "/frontend/src/assets/svg/housing.svg",
    technique: "/frontend/src/assets/svg/technique.svg",
    communal_communication:
      "/frontend/src/assets/svg/communal_communication.svg",
    sports_hobbies: "/frontend/src/assets/svg/sports_hobbies.svg",
    education: "/frontend/src/assets/svg/education.svg",
    other: "/frontend/src/assets/svg/other.svg",
  },
};

const IncomeExpenseSwitch = ({ income = [], expenses = [] }) => {
  // Domyślnie sekcja expenses
  const [currentSection, setCurrentSection] = useState("expenses");

  // Logowanie danych dla debugowania
  useEffect(() => {
    console.log("Income data:", income);
    console.log("Expenses data:", expenses);
  }, [income, expenses]);

  const handleSectionChange = () => {
    // Prosta zmiana sekcji między expenses a income
    setCurrentSection((prevSection) =>
      prevSection === "expenses" ? "income" : "expenses",
    );
  };

  const formatData = (data) => {
    if (!Array.isArray(data)) {
      if (typeof data === "object" && data !== null) {
        return Object.entries(data).map(([name, value]) => ({ name, value }));
      } else if (typeof data === "number") {
        return [
          {
            name:
              currentSection === "income"
                ? "General Income"
                : "General Expenses",
            value: data,
          },
        ];
      } else {
        console.log("Data is not an object or array:", data);
        return [];
      }
    }
    return data;
  };

  const renderContent = () => {
    const data =
      currentSection === "income" ? formatData(income) : formatData(expenses);

    if (!Array.isArray(data) || data.length === 0) {
      console.log("No valid data in this section:", currentSection);
      return <p>No valid data available for this section.</p>;
    }

    return (
      <div className="section-grid">
        {data.map((item, index) => (
          <div key={index} className="section-category">
            <img
              src={
                categoryIcons[currentSection][item.name.toLowerCase()] ||
                "/assets/icons/default.svg"
              }
              alt={item.name}
              className="section-icon"
            />
            <p>{item.name}</p>
            <span>{item.value?.toFixed(2) || 0} UAH</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="income-expense-switch">
      <div className="switch-header">
        <button
          onClick={handleSectionChange} // Zmiana sekcji po kliknięciu
          className="switch-arrow">
          <img
            src="/frontend/src/assets/svg/arrow-left.svg"
            alt="Previous section"
          />
        </button>
        <h3>{currentSection === "income" ? "INCOME" : "EXPENSES"}</h3>
        <button
          onClick={handleSectionChange} // Zmiana sekcji po kliknięciu
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
