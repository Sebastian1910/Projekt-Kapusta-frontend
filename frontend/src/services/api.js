import axios from "axios";

const API_URL = "/api";

export const register = (email, password) => {
  return axios.post(`${API_URL}/auth/register`, { email, password });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const getTransactions = (token) => {
  return axios.get(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
