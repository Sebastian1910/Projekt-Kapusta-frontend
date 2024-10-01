import React from "react";
import { useSelector } from "react-redux";

import Balance from "../components/Balance";
import Header from "../components/Header";
import Summary from "../components/Summary";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import "../styles/pages/HomePage.scss";

import Kapusta2 from "../assets/svg/Group 37-wiele kapust.svg";

const HomePage = () => {
  const transactions = useSelector((state) => state.transactions.list);

  return (
    <div className="home-page">
      <Header />
      <div className="bg-home"></div>
      <div className="content">
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
