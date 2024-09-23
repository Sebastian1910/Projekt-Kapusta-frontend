import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Balance from "../components/Balance";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import "../styles/pages/HomePage.scss";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Header />
      <div className="content">
        {/* Przycisk Reports w prawym górnym rogu */}
        <div className="reports-button-container">
          <button
            className="reports-button"
            onClick={() => navigate("/reports")}>
            <span>Reports</span>
            {/* Możesz dodać ikonę SVG w tym miejscu, jeśli jest potrzebna */}
          </button>
        </div>
        <Balance />
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
};

export default HomePage;
