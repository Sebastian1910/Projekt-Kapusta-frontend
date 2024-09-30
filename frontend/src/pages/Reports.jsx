import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../store/actions/reportActions";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Reports.scss";
import Balance from "../components/Balance";
import ReportsChart from "../components/ReportsChart";
import IncomeExpenseSwitch from "../components/IncomeExpenseSwitch";
import SummaryHeader from "../components/SummaryHeader";

import Main_page from "../assets/svg/keyboard_backspace-24px.svg";
import Previous_month from "../assets/svg/arrow-left.svg";
import Next_month from "../assets/svg/arrow-right.svg";

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transactions = useSelector((state) => state.transactions.list);

  const [currentCategory, setCurrentCategory] = useState("products"); // Domyślna kategoria dla wydatków
  const [currentSection, setCurrentSection] = useState("expenses"); // Domyślna zakładka to 'expenses'
  const [currentPeriod, setCurrentPeriod] = useState({
    month: new Date().getMonth(), // Miesiąc w formacie 0-11
    year: new Date().getFullYear(),
  });

  // Funkcja do zmiany okresu
  const handlePeriodChange = (direction) => {
    let { month, year } = currentPeriod;

    // Zmiana okresu w zależności od kierunku
    if (direction === "prev") {
      month -= 1;
      if (month < 0) {
        month = 11;
        year -= 1;
      }
    } else {
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
    }

    // Ustawienie nowego okresu
    setCurrentPeriod({ month, year });
  };

  // Pobieranie raportów na podstawie zmiany okresu
  useEffect(() => {
    dispatch(fetchReports(currentPeriod));
  }, [dispatch, currentPeriod]);

  // Filtrowanie transakcji według okresu
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === currentPeriod.month &&
      transactionDate.getFullYear() === currentPeriod.year
    );
  });

  // Filtrowanie transakcji na wydatki i dochody
  const expenses = filteredTransactions.filter((t) => t.type === "expense");
  const income = filteredTransactions.filter((t) => t.type === "income");

  // Obliczanie sumy wydatków i dochodów
  const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);

  // Obsługa zmiany zakładki między "expenses" a "income"
  const handleSectionChange = (newSection) => {
    setCurrentSection(newSection);
    // Ustawienie domyślnej kategorii w zależności od sekcji
    if (newSection === "income") {
      setCurrentCategory("salary"); // Domyślnie kategoria dla 'income' to 'salary'
    } else {
      setCurrentCategory("products"); // Domyślna kategoria dla 'expenses'
    }
  };

  // Obsługa kliknięcia na kategorię w IncomeExpenseSwitch
  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    
    <div className="reports-page">
      <div className="reports-bg"></div>
      <Header />
      <div className="reports-header">
        <button className="back-button" onClick={() => navigate("/home")}>
          <img src={Main_page} alt="Main page" />
          <p className="raport-back-text">Main page</p>
        </button>
        <div className="current-period-container">
          <p>Current period:</p>
          <div className="current-period">
            <button onClick={() => handlePeriodChange("prev")}>
              <img src={Previous_month} alt="Previous month" />
            </button>
            <span className="period-display">
              {currentPeriod.month + 1}/{currentPeriod.year}
            </span>
            <button onClick={() => handlePeriodChange("next")}>
              <img src={Next_month} alt="Next month" />
            </button>
          </div>
        </div>
        <div className="balance-display">
          <Balance />
        </div>
      </div>

      <div>
        <SummaryHeader expenses={totalExpenses} income={totalIncome} />
      </div>

      {/* Przełącznik między income a expenses */}
      <div className="income-expense-switch-container">
        <IncomeExpenseSwitch
          income={income}
          expenses={expenses}
          onCategoryClick={handleCategoryClick}
          currentSection={currentSection} // Przekazywanie aktualnej sekcji
          onSectionChange={handleSectionChange} // Obsługa zmiany sekcji
        />
      </div>

      <div className="report-chart">
        <ReportsChart
          transactions={filteredTransactions}
          selectedCategory={currentCategory}
        />
      </div>
    </div>
  );
};

export default Reports;
