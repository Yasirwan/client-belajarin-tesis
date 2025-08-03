import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");
//create test
export const createTest = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_TEST_REQUEST });
    const res = await axios.post(`${url}/test/create`, { data, token });
    dispatch({
      type: types.CREATE_TEST_SUCCESS,
      payload: { test: res.data.test },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_TEST_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all test data
export const getTestData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_TEST_REQUEST });
    const res = await axios.get(`${url}/test/all`);
    dispatch({
      type: types.GET_TEST_SUCCESS,
      payload: { test: res.data.test },
    });
  } catch (error) {
    dispatch({
      type: types.GET_TEST_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single test data
export const getSingleTestData = (testId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_TEST_REQUEST });
    const res = await axios.get(`${url}/test/${testId}`);
    dispatch({
      type: types.GET_SINGLE_TEST_SUCCESS,
      payload: { test: res.data.test },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_TEST_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete test
export const deleteTest = (testId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_TEST_REQUEST });
    const res = await axios.delete(`${url}/test/${testId}`);
    dispatch({
      type: types.DELETE_TEST_SUCCESS,
      payload: { testId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_TEST_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
