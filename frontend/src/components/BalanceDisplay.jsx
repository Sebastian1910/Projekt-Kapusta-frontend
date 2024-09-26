import { useSelector } from "react-redux";
import "../styles/components/BalanceDisplay.scss";

const BalanceDisplay = () => {
  const balance = useSelector((state) => state.balance.amount);
 

  return (
    <div className="balance-section">
      <h2 className="balance-title">Balance: </h2>
      <div className="balance-form">
          <input
          type="string"
          value={balance +" UAH"}
          className="balance-input"
        />
      </div>
    </div>
  );
};

export default BalanceDisplay;
