import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/authActions"; // Importuj akcję logowania
import { Link } from "react-router-dom";
import "../styles/pages/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Pobierz stan logowania

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })); // Wywołaj akcję logowania z danymi
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
              <img src="frontend/src/assets/svg/Google.svg" alt="Google" />
              Google
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
              {error && <p className="error">{error}</p>}{" "}
              {/* Wyświetlenie błędu */}
              <ul>
                <li>
                  <button
                    type="submit"
                    className="login-button"
                    disabled={loading}>
                    {loading ? "Logging in..." : "LOG IN"}{" "}
                    {/* Pokazuje ładowanie */}
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
