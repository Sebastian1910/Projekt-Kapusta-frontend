import axios from "axios";
import { createAction } from "@reduxjs/toolkit";

export const fetchReportsRequest = createAction("reports/fetchReportsRequest");
export const fetchReportsSuccess = createAction("reports/fetchReportsSuccess");
export const fetchReportsFailure = createAction("reports/fetchReportsFailure");

export const fetchReports = (period) => async (dispatch) => {
  dispatch(fetchReportsRequest());
  try {
    const response = await axios.get("/api/reports", { params: period });
    dispatch(fetchReportsSuccess(response.data));
  } catch (error) {
    dispatch(fetchReportsFailure(error.message));
  }
};
