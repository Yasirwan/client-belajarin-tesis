import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");

//create scratch
export const createScratch = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_SCRATCH_REQUEST });
    const res = await axios.post(`${url}/scratch/create`, { data, token });
    dispatch({
      type: types.CREATE_SCRATCH_SUCCESS,
      payload: { scratch: res.data.scratch },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_SCRATCH_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_SCRATCH_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/scratch/add`, { id, desc });
    dispatch({
      type: types.ADD_SCRATCH_RESPONSE_SUCCESS,
      payload: { scratch: res.data.scratch },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_SCRATCH_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all scratch data
export const getScratchData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SCRATCH_REQUEST });
    const res = await axios.get(`${url}/scratch/all`);
    dispatch({
      type: types.GET_SCRATCH_SUCCESS,
      payload: { scratch: res.data.scratchs },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SCRATCH_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single scratch data
export const getSingleScratchData = (scratchId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_SCRATCH_REQUEST });
    const res = await axios.get(`${url}/scratch/${scratchId}`);
    dispatch({
      type: types.GET_SINGLE_SCRATCH_SUCCESS,
      payload: { scratch: res.data.scratch },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_SCRATCH_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete scratch
export const deleteScratch = (scratchId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SCRATCH_REQUEST });
    const res = await axios.delete(`${url}/scratch/${scratchId}`);
    dispatch({
      type: types.DELETE_SCRATCH_SUCCESS,
      payload: { scratchId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_SCRATCH_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
