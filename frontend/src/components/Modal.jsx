import React from "react";
import "../styles/components/Modal.scss";

const Modal = ({ title, children, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{title}</h3>

        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button onClick={onConfirm}>Potwierdź</button>
          <button onClick={onCancel}>Anuluj</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
