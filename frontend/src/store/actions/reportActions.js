import axios from "axios";
import {
  fetchReportsRequest,
  fetchReportsSuccess,
  fetchReportsFailure,
} from "../reducers/reportReducer";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchReports = (period) => async (dispatch) => {
  dispatch(fetchReportsRequest());
  try {
    const response = await axios.get(`${API_URL}/reports`, {
      params: { month: period.month, year: period.year },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(fetchReportsSuccess(response.data));
  } catch (error) {
    dispatch(fetchReportsFailure(error.response.data.message));
  }
};
