import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../store/reducers/balanceReducer";
import "../styles/components/Balance.scss";
import Modal from "./Modal";

const Balance = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.amount);
  const [newBalance, setNewBalance] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    dispatch(updateBalance(parseFloat(newBalance)));
    setNewBalance("");
    setShowModal(false);
  };

  return (
    <div className="balance-section">
      <h2 className="balance-title">Balance: </h2>
      <div className="balance-form">
        <input
          type="number"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
          placeholder={balance.toFixed(2)}
          className="balance-input"
        />
        <span className="balance-currency">UAH</span>
        <button
          className="balance-confirm-btn"
          onClick={() => setShowModal(true)}>
          Confirm
        </button>
      </div>
      {showModal && (
        <Modal
          title="Potwierdź zmianę bilansu"
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}>
          Czy na pewno chcesz zaktualizować bilans?
        </Modal>
      )}
    </div>
  );
};

export default Balance;
