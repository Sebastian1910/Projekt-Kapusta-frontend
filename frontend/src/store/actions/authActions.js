import axios from "axios";
import {
  authRequest,
  authSuccess,
  authFailure,
  logout,
} from "../reducers/authReducer";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials,
    );
    dispatch(authSuccess(response.data));
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    dispatch(authFailure(error.response.data.message));
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      userData,
    );
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
