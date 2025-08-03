import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");
//create assignment
export const createAssignment = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ASSIGNMENT_REQUEST });
    const res = await axios.post(`${url}/assignment/create`, { data, token });
    dispatch({
      type: types.CREATE_ASSIGNMENT_SUCCESS,
      payload: { assignment: res.data.assignment },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_ASSIGNMENT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all assignment data
export const getAssignmentData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ASSIGNMENT_REQUEST });
    const res = await axios.get(`${url}/assignment/all`);
    dispatch({
      type: types.GET_ASSIGNMENT_SUCCESS,
      payload: { assignment: res.data.assignment },
    });
  } catch (error) {
    dispatch({
      type: types.GET_ASSIGNMENT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single assignment data
export const getSingleAssignmentData = (assignmentId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_ASSIGNMENT_REQUEST });
    const res = await axios.get(`${url}/assignment/${assignmentId}`);
    dispatch({
      type: types.GET_SINGLE_ASSIGNMENT_SUCCESS,
      payload: { assignment: res.data.assignment },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_ASSIGNMENT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete assignment
export const deleteAssignment = (assignmentId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ASSIGNMENT_REQUEST });
    const res = await axios.delete(`${url}/assignment/${assignmentId}`);
    dispatch({
      type: types.DELETE_ASSIGNMENT_SUCCESS,
      payload: { assignmentId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_ASSIGNMENT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
