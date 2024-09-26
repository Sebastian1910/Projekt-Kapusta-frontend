import axios from "axios";
import {
  fetchReportsRequest,
  fetchReportsSuccess,
  fetchReportsFailure,
} from "../reducers/reportReducer";

export const fetchReports = (period) => async (dispatch) => {
  dispatch(fetchReportsRequest());
  try {
    const response = await axios.get("http://localhost:5000/api/reports", {
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
