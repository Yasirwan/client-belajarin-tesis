import * as types from "./typesx.js";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");

//create lessonx
export const createLessonx = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_LESSONX_REQUEST });
    const res = await axios.post(`${url}/lessonx/create`, { data, token });
    dispatch({
      type: types.CREATE_LESSONX_SUCCESS,
      payload: { lessonx: res.data.lessonx },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_LESSONX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all lessonx data
export const getLessonxData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LESSONX_REQUEST });
    const res = await axios.get(`${url}/lessonx/all`);
    dispatch({
      type: types.GET_LESSONX_SUCCESS,
      payload: { lessonx: res.data.lessonsx },
    });
  } catch (error) {
    dispatch({
      type: types.GET_LESSONX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete lessonx
export const deleteLessonx = (lessonxId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_LESSONX_REQUEST });
    const res = await axios.delete(`${url}/lessonx/${lessonxId}`);
    dispatch({
      type: types.DELETE_LESSONX_SUCCESS,
      payload: { lessonxId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_LESSONX_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
