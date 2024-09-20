import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { logoutUser } from "../store/actions/authActions";
import "../styles/components/Header.scss";
import Modal from "./Modal";

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
      <Logo />
      <nav className="header-nav">
        <ul>
          <li className="username-img-header">U</li>
          <li className="username-header">User Name</li>
        </ul>
        <button
          className="header-logout-btn"
          onClick={() => setShowModal(true)}>
          Exit
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
