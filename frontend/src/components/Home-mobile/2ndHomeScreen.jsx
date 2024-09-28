import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TransactionList from "../TransactionList"; // Assuming you have this component
import Modal from "../Modal"; // Import Modal component
import "../styles/BalanceComponent.scss";

const BalanceComponent = () => {
  const transactions = useSelector((state) => state.transactions.list);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleConfirmBalance = () => {
    if (balance === 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <h2>Your Balance: {balance} UAH</h2>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="00.00 UAH"
        />
        <button className="confirm-button" onClick={handleConfirmBalance}>
          Confirm Balance
        </button>

        {showModal && <Modal onClose={handleCloseModal} />}
      </div>

      <div className="add-transaction-button-container">
        <button onClick={() => navigate("/add-transaction")}>
          Add Transaction
        </button>
      </div>

      <div className="transaction-list">
        <h3>Transaction History</h3>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default BalanceComponent;
