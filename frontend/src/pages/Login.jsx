import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions/authActions";
import "../styles/pages/Login.scss";

import Kapusta2 from "../assets/svg/Group 37-wiele kapust.svg";
import Kapusta1 from "../assets/svg/Group 38-2 kapusty.svg";
import Google from "../assets/svg/Google.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login-container">
      <div className="bg-login">
        <img src={Kapusta2} alt="Kapusta" />
      </div>
      <div className="first-content">
        <h1>Kapu$ta</h1>
        <p>Smart Finance</p>
        <img src={Kapusta1} alt="Kapusta" />
      </div>
      <div className="form-content">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <p>You can log in with your Google Account:</p>
            <button className="google-login">
              <img src={Google} alt="Google" />
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
              <ul>
                <li>
                  <button
                    type="submit"
                    className="login-button"
                    disabled={loading}>
                    {loading ? "Logging in..." : "LOG IN"}{" "}
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
