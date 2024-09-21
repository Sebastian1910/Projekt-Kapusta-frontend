import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthIsAuth } from '../redux/authSelectors';

const RestrictedRoute = ({ children, redirectTo = '/reports' }) => {
  const isAuth = useSelector(selectAuthIsAuth);
  return isAuth ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;