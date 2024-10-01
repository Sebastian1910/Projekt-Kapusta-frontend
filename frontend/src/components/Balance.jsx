import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../store/reducers/balanceReducer";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/components/Balance.scss";
import Tooltip from "./Tooltip";
import Modal from "./Modal";
import Raport from "../assets/svg/bar_chart-24px.svg";

import Raport from "../assets/svg/bar_chart-24px.svg";

const Balance = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.amount);
  const [newBalance, setNewBalance] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [location]);


  const handleConfirm = () => {
    dispatch(updateBalance(parseFloat(newBalance)));
    setNewBalance("");
    setShowModal(false);
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <div className="balance-section">
      <div className="reports-button-container">
        <button className="reports-button" onClick={() => navigate("/reports")}>
          <span>Reports</span>

          <img src={Raport} alt="Reports icon" />

        </button>
        <div className="balance-inputs">
          <div>
            <h2 className="balance-title">Balance: </h2>
          </div>
          <div>
            <div className="balance-form">
              <div className="balance-input-span">
                <input
                  type="number"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  placeholder={balance.toFixed(2)}
                  className="balance-input"
                />
                <span className="balance-currency">UAH</span>
              </div>
              <button
                className="balance-confirm-btn"
                onClick={() => setShowModal(true)}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="balance-inputs">
        <div>
          <h2 className="balance-title">Balance: </h2>
        </div>
        <div>
          <div className="balance-form">
            <div className="balance-input-span">
              <input
                type="number"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder={balance.toFixed(2)}
                className="balance-input"
              />
              <span className="balance-currency">UAH</span>
            </div>
            <button
              className="balance-confirm-btn"
              onClick={() => setShowModal(true)}>
              Confirm
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Potwierdź zmianę bilansu"
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}>
          Are you sure?
        </Modal>
      )}
      {showTooltip && <Tooltip onClose={handleTooltipClose} />}{" "}
    </div>
  );
};

export default Balance;
