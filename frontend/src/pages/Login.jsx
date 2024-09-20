import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika logowania
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/path/to/logo.png" alt="Kapusta" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <p>You can log in with your Google Account:</p>
          <button className="google-login">
            <img src="/path/to/google-icon.png" alt="Google" /> Google
          </button>
          <p>Or log in using an email and password, after registering:</p>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>
        <Link to="/register" className="register-link">
          REGISTRATION
        </Link>
      </div>
    </div>
  );
};

export default Login;
