import React from "react";
import { useSelector } from "react-redux";
import Balance from "../components/Balance";
import Header from "../components/Header";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Summary from "../components/Summary"; // Dodany komponent Summary
import "../styles/pages/HomePage.scss";

const HomePage = () => {
  const transactions = useSelector((state) => state.transactions.list);

  return (
    <div className="home-page">
      <Header />
      <div className="bg-home"></div>
      <div className="content">
        <div className="reports-button-container">
          <button
            className="reports-button"
            onClick={() => navigate("/reports")}>
            <span>Reports</span>
            <img src="frontend/src/assets/svg/bar_chart-24px.svg" />
          </button>
        </div>
        <Balance />
        <div className="container-transaction">
          <TransactionForm />
          <TransactionList />
        </div>
        <Summary transactions={transactions} /> {/* Podsumowanie */}
      </div>
      <img
        src="frontend/src/assets/svg/Group 37-wiele kapust.svg"
        alt="Kapusta"
        className="kapusta-bg"
      />
    </div>
  );
};

export default HomePage;
