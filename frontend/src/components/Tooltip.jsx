import React, { useEffect } from "react";
import "../styles/components/Tooltip.scss";

const Tooltip = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="tooltip" onClick={onClose}>
      {" "}
      <div className="tooltip-message">
        <p>Hello! To get started, enter the current balance of your account!</p>
        <p>You can't spend money until you have it :)</p>
      </div>
    </div>
  );
};

export default Tooltip;
