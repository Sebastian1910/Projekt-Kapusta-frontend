import axios from "axios";
import {
  authRequest,
  authSuccess,
  authFailure,
  logout,
} from "../reducers/authReducer";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    dispatch(authSuccess(response.data));
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    dispatch(authFailure(error.response.data.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    dispatch(authSuccess(response.data));
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    dispatch(authFailure(error.response.data.message));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};
