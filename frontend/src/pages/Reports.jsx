import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../store/actions/reportActions";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Reports.scss";

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reports = useSelector((state) => state.reports.data);
  const [currentPeriod, setCurrentPeriod] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    dispatch(fetchReports(currentPeriod));
  }, [dispatch, currentPeriod]);

  const handlePeriodChange = (direction) => {
    let { month, year } = currentPeriod;
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
    setCurrentPeriod({ month, year });
  };

  return (
    <div className="reports-page">
      <Header />
      <div className="reports-header">
        <button className="back-button" onClick={() => navigate("/home")}>
          Powrót do strony głównej
        </button>
        <div className="current-period">
          <button onClick={() => handlePeriodChange("prev")}>◀</button>
          <span className="period-display">
            {currentPeriod.month + 1}/{currentPeriod.year}
          </span>
          <button onClick={() => handlePeriodChange("next")}>▶</button>
        </div>
      </div>
      {/* Tutaj mogą się znajdować wykresy lub inne dane raportów */}
      <div className="report-chart">Wykres raportów</div>
    </div>
  );
};

export default Reports;
