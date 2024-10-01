import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import Header from "../components/Header";
import Summary from "../components/Summary";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import "../styles/pages/HomePage.scss";

import Kapusta2 from "../assets/svg/Group 37-wiele kapust.svg";

const HomePage = () => {
  const transactions = useSelector((state) => state.transactions.list);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [selectedType, setSelectedType] = useState("expense");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleButtonClick = (type) => {
    setSelectedType(type);
    setShowMobileForm(true);
  };

  return (
    <div className="home-page">
      <Header />
      <div className="bg-home"></div>
      <div className="content">
        {(!showMobileForm || !isMobile) && <Balance />}
        {showMobileForm && isMobile && (
          <TransactionForm initType={selectedType} />
        )}
        <div className="container-transaction">
          <TransactionForm />
          <div className="summary-list-container">
            {(!showMobileForm || !isMobile) && <TransactionList />}
            <Summary transactions={transactions} />
          </div>
        </div>
      </div>
      <img src={Kapusta2} alt="Kapusta" className="kapusta-bg" />
    </div>
  );
};

export default HomePage;
