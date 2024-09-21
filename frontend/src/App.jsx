import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import PrivateRoute from "./routes/PrivateRoute";
import RestrictedRoute from './routes/RestrictedRoute';
import "./styles/App.scss";

import {
  selectAuthError,
  selectAuthIsAuth,
  selectAuthIsLoading,
} from '../src/redux/authSelectors';
import { refreshThunk } from '../src/redux/authReducers';

const appRoutes = [
  { path: '/', element: <HomePage /> },
  {
    path: '/register',
    element: (
      <RestrictedRoute>
        <Register />
      </RestrictedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <RestrictedRoute>
        <Login />
      </RestrictedRoute>
    ),
  },
  {
    path: '/reports',
    element: (
      <PrivateRoute>
        <Reports />
      </PrivateRoute>
    ),
  },
];

const App = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectAuthIsAuth);
  const isLoading = useSelector(selectAuthIsLoading);
  const errorAuth = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <Router>
      <Header /> {/*dodane*/}
      <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      {isAuth === true && <HomePage />}
      {isLoading === true && <Loader />}
      {errorAuth || (errorFetch && Notiflix.Notify.warning('Error'))}
    </Router>
  );
};

export default App;
