import * as types from "./typesz.js";
import axios from "axios";
import url from "../../BackendURL.js";

//create doubt
export const createDoubtz = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DOUBTZ_REQUEST });
    const res = await axios.post(`${url}/doubtz/create`, data);
    dispatch({
      type: types.CREATE_DOUBTZ_SUCCESS,
      payload: { doubtz: res.data.doubtz },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_DOUBTZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_DOUBTZ_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/doubtz/add`, { id, desc });
    dispatch({
      type: types.ADD_DOUBTZ_RESPONSE_SUCCESS,
      payload: { doubtz: res.data.doubtz },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_DOUBTZ_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all doubts data
export const getDoubtzData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOUBTZ_REQUEST });
    const res = await axios.get(`${url}/doubtz/all`);
    dispatch({
      type: types.GET_DOUBTZ_SUCCESS,
      payload: { doubtz: res.data.doubtz },
    });
  } catch (error) {
    dispatch({
      type: types.GET_DOUBTZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single doubt data
export const getSingleDoubtzData = (doubtzId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_DOUBTZ_REQUEST });
    const res = await axios.get(`${url}/doubtz/${doubtzId}`);
    dispatch({
      type: types.GET_SINGLE_DOUBTZ_SUCCESS,
      payload: { doubtz: res.data.doubtz },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_DOUBTZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete doubt
export const deleteDoubtz = (doubtzId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DOUBTZ_REQUEST });
    const res = await axios.delete(`${url}/doubtz/${doubtzId}`);
    dispatch({
      type: types.DELETE_DOUBTZ_SUCCESS,
      payload: { doubtzId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_DOUBTZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//resolve doubt
export const resolveDoubtz = (doubtzId) => async (dispatch) => {
  try {
    dispatch({ type: types.RESOLVE_DOUBTZ_REQUEST });
    const res = await axios.patch(`${url}/doubtz/${doubtzId}`, {
      resolved: "Yes",
    });
    dispatch({
      type: types.RESOLVE_DOUBTZ_SUCCESS,
      payload: { id: doubtzId, doubtz: res.data.doubtz },
    });
  } catch (error) {
    dispatch({
      type: types.RESOLVE_DOUBTZ_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
