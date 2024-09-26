import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { logoutUser } from "../store/actions/authActions";
import "../styles/components/Header.scss";
import Modal from "./Modal";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Sprawdzamy, czy użytkownik jest zalogowany
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); // Zaciągamy dane użytkownika, jeśli są

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="header">
      {/* Logo widoczne zawsze */}
      <Logo />
      <nav className="header-nav">
        {/* Sprawdzamy, czy użytkownik jest zalogowany */}
        {isAuthenticated && (
          <ul>
            <li className="username-img-header">U</li>
            <li className="username-header">{user?.name || "User Name"}</li>
            <button
              className="header-logout-btn"
              onClick={() => setShowModal(true)}>
              <img
                className="header-logout-svg"
                src="frontend/src/assets/svg/logout 1.svg"
                alt="logout"
              />

              <img src="/frontend/src/assets/svg/logout 1.svg" alt="logout" />
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
