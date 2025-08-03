import * as types from "./typesx.js";
import axios from "axios";
import url from "../../BackendURL.js";

//create doubt
export const createDoubtx = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DOUBTX_REQUEST });
    const res = await axios.post(`${url}/doubtx/create`, data);
    dispatch({
      type: types.CREATE_DOUBTX_SUCCESS,
      payload: { doubtx: res.data.doubtx },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_DOUBTX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_DOUBTX_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/doubtx/add`, { id, desc });
    dispatch({
      type: types.ADD_DOUBTX_RESPONSE_SUCCESS,
      payload: { doubtx: res.data.doubtx },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_DOUBTX_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all doubts data
export const getDoubtxData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOUBTX_REQUEST });
    const res = await axios.get(`${url}/doubtx/all`);
    dispatch({
      type: types.GET_DOUBTX_SUCCESS,
      payload: { doubtx: res.data.doubtx },
    });
  } catch (error) {
    dispatch({
      type: types.GET_DOUBTX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single doubt data
export const getSingleDoubtxData = (doubtxId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_DOUBTX_REQUEST });
    const res = await axios.get(`${url}/doubtx/${doubtxId}`);
    dispatch({
      type: types.GET_SINGLE_DOUBTX_SUCCESS,
      payload: { doubtx: res.data.doubtx },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_DOUBTX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete doubt
export const deleteDoubtx = (doubtxId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DOUBTX_REQUEST });
    const res = await axios.delete(`${url}/doubtx/${doubtxId}`);
    dispatch({
      type: types.DELETE_DOUBTX_SUCCESS,
      payload: { doubtxId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_DOUBTX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//resolve doubt
export const resolveDoubtx = (doubtxId) => async (dispatch) => {
  try {
    dispatch({ type: types.RESOLVE_DOUBTX_REQUEST });
    const res = await axios.patch(`${url}/doubtx/${doubtxId}`, {
      resolved: "Yes",
    });
    dispatch({
      type: types.RESOLVE_DOUBTX_SUCCESS,
      payload: { id: doubtxId, doubtx: res.data.doubtx },
    });
  } catch (error) {
    dispatch({
      type: types.RESOLVE_DOUBTX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
