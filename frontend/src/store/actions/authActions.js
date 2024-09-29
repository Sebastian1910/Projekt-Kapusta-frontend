import axios from "axios";
import {
  authRequest,
  authSuccess,
  authFailure,
  logout,
} from "../reducers/authReducer";

const API_URL = import.meta.env.VITE_API_URL;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://projekt-kapusta-backend.vercel.app/api/login",
      userData,
      {
        withCredentials: true,
      },
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Login error:", error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.error || "Login failed",
    });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
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
