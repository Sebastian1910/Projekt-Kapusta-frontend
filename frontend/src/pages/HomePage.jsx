import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Balance from "../components/Balance";
import Header from "../components/Header";
import Summary from "../components/Summary";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import "../styles/pages/HomePage.scss";

import Raport from "../assets/svg/bar_chart-24px.svg";
import Kapusta2 from "../assets/svg/Group 37-wiele kapust.svg";

const HomePage = () => {
  const transactions = useSelector((state) => state.transactions.list);
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
            <img src={Raport} />
          </button>
        </div>
        <Balance />
        <div className="container-transaction">
          <TransactionForm />
          <div className="summary-list-container">
            <TransactionList />
            <Summary transactions={transactions} />
          </div>
        </div>
      </div>
      <img src={Kapusta2} alt="Kapusta" className="kapusta-bg" />
    </div>
  );
};

export default HomePage;
