import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password })).then(() => {
      navigate("/home");
    });
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>REGISTRATION</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Rejestrowanie..." : "REGISTRATION"}
        </button>
        <p>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
