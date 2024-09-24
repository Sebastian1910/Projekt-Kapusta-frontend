import React from "react";
import { useNavigate } from "react-router-dom";
import Balance from "../components/Balance";
import Header from "../components/Header";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import "../styles/pages/HomePage.scss";

const HomePage = () => {
  const navigate = useNavigate();

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
