import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import PrivateRoute from "./routes/PrivateRoute";
import "./styles/App.scss";

const App = () => {
  return (
    <Router>
      <Header /> {/*dodane*/}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
