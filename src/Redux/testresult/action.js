import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

//save test result
export const saveTestResult = (data) => async (dispatch) => {
  const {payload, token} = data
  
  try {
    dispatch({ type: types.SAVE_TEST_RESULT });
    const res = await axios.post(`${url}/test-result`, { payload }, {
      headers: {
      Authorization: `Bearer ${token}`
      }
    });
    if (res.data) {
      dispatch({
        type: types.SAVE_TEST_RESULT,
        payload: { testResult: res.data },
      });
    }
    return res.data;
  } catch (error) {
    dispatch({
      type: types.SAVE_TEST_RESULT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

// get test result data 
export const getTestResult = (data) => async (dispatch) => {
  const {query, token} = data
  try {
    dispatch({ type: types.GET_TEST_RESULT_REQUEST });
    const res = await axios.get(`${url}/test-result`, {
      params: query,
      headers: {
      Authorization: `Bearer ${token}`
      }
    });

    dispatch({
      type: types.GET_TEST_RESULT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_TEST_RESULT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};