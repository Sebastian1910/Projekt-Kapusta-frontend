import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="first-content">
        <h1>Kapu$ta</h1>
        <p>Smart Finance</p>
      </div>
      <div className="form-content">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <p>You can log in with your Google Account:</p>
            <button className="google-login">
              <img src="/path/to/google-icon.png" alt="Google" /> Google
            </button>
            <p>Or log in using an email and password, after registering:</p>
            <div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <ul>
                <li>
                  {" "}
                  <button type="submit" className="login-button">
                    LOG IN
                  </button>
                </li>
                <li>
                  <Link to="/register" className="register-link">
                    REGISTRATION
                  </Link>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
