import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/authActions";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import "../styles/components/Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/src/assets/logo.png" alt="Kapusta" className="header-logo" />
        <h1 className="header-title">Kapusta</h1>
      </div>
      <nav className="header-nav">
        <button
          className="header-logout-btn"
          onClick={() => setShowModal(true)}>
          Wyloguj
        </button>
      </nav>
      {showModal && (
        <Modal
          title="Potwierdź wylogowanie"
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}>
          Czy na pewno chcesz się wylogować?
        </Modal>
      )}
    </header>
  );
};

export default Header;
