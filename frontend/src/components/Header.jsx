import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { logoutUser } from "../store/actions/authActions";
import "../styles/components/Header.scss";
import Modal from "./Modal";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const getUserNameFromEmail = (email) => {
    return email ? email.split("@")[0] : "User Name";
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="header">
      <Logo />
      <nav className="header-nav">
        {isAuthenticated && user && user.email && (
          <ul>
            <li>
              <input
                type="text"
                value={getUserNameFromEmail(user.email).charAt(0).toUpperCase()}
                readOnly
                className="username-img-header"
              />
            </li>
            <li className="username-header">
              {getUserNameFromEmail(user.email)}
            </li>
            <button
              className="header-logout-btn"
              onClick={() => setShowModal(true)}>
              <img
                className="header-logout-svg"
                src="/frontend/src/assets/svg/logout 1.svg"
                alt="logout"
              />
              <span> Exit</span>
            </button>
          </ul>
        )}
      </nav>
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
