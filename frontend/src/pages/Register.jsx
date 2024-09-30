import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/actions/authActions";
import "../styles/App.scss";

import Kapusta1 from "../assets/svg/Group 38-2 kapusty.svg";
import Kapusta2 from "../assets/svg/Group 37-wiele kapust.svg";

const Register = () => {
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
    dispatch(registerUser({ email, password }));
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
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>REGISTRATION</h2>
            {error && <p className="error">{error}</p>}
            <p>Please register with your email and password:</p>
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
                  <button
                    type="submit"
                    className="login-button"
                    disabled={loading}>
                    {loading ? "Rejestrowanie..." : "REGISTRATION"}
                  </button>
                </li>
                <li>
                  <Link to="/" className="register-link">
                    LOGIN
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

export default Register;
