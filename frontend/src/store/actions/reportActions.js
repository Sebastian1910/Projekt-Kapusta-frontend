import axios from "axios";
import {
  fetchReportsRequest,
  fetchReportsSuccess,
  fetchReportsFailure,
} from "../reducers/reportReducer";

export const fetchReports = (period) => async (dispatch) => {
  dispatch(fetchReportsRequest());
  try {
    const response = await axios.get("/api/reports", {
      params: period,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(fetchReportsSuccess(response.data));
  } catch (error) {
    dispatch(fetchReportsFailure(error.response.data.message));
  }
};
