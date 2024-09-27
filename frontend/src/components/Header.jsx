import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/actions/authActions";
import "../styles/components/Header.scss";
import Logo from "./Logo";
import Modal from "./Modal";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Lokalny stan dla edytowalnej nazwy użytkownika
  const [editableName, setEditableName] = useState(user?.name || "");

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleNameChange = (e) => {
    setEditableName(e.target.value);
    // Opcjonalnie: wywołaj akcję Redux do aktualizacji nazwy użytkownika
    // dispatch(updateUserName(e.target.value));
  };

  return (
    <header className="header">
      {/* Logo widoczne zawsze */}
      <Logo />
      <nav className="header-nav">
        {/* Sprawdzamy, czy użytkownik jest zalogowany */}
        {isAuthenticated && (
          <ul>
            <li>
              <input
                type="text"
                value="U"
                readOnly
                className="username-img-header"
              />
            </li>
            <li className="username-header">{user?.name || "User Name"}</li>
            <button
              className="header-logout-btn"
              onClick={() => setShowModal(true)}>
              <img
                className="header-logout-svg"
                src="frontend/src/assets/svg/logout 1.svg"
                alt="logout"
              />
              <img src="frontend/src/assets/svg/logout 1.svg" alt="logout" />
              <span> Exit</span>
            </button>
          </ul>
        )}
      </nav>
      {/* Modal do potwierdzenia wylogowania */}
      {showModal && (
        <Modal
          title="Potwierdź wylogowanie"
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}>
          Do you really want to leave?
        </Modal>
      )}
    </header>
  );
};

export default Header;
