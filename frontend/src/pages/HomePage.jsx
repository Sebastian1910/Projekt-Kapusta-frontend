import React from "react";
import Header from "../components/Header";
import Balance from "../components/Balance";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import "../styles/App.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="content">
        <Balance />
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
};

export default HomePage;
