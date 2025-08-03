import * as types from "./types";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");

//create lesson
export const createLesson = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_LESSON_REQUEST });
    const res = await axios.post(`${url}/lesson/create`, { data, token });
    dispatch({
      type: types.CREATE_LESSON_SUCCESS,
      payload: { lesson: res.data.lesson },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_LESSON_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all lesson data
export const getLessonData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_LESSON_REQUEST });
    const res = await axios.get(`${url}/lesson/all`);
    dispatch({
      type: types.GET_LESSON_SUCCESS,
      payload: { lesson: res.data.lessons },
    });
  } catch (error) {
    dispatch({
      type: types.GET_LESSON_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete lesson
export const deleteLesson = (lessonId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_LESSON_REQUEST });
    const res = await axios.delete(`${url}/lesson/${lessonId}`);
    dispatch({
      type: types.DELETE_LESSON_SUCCESS,
      payload: { lessonId },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_LESSON_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//resolve
export const resolveLesson = (lessonId) => async (dispatch) => {
  try {
    dispatch({ type: types.RESOLVE_LESSON_REQUEST });
    const res = await axios.patch(`${url}/lesson/${lessonId}`, {
      resolved: "Yes",
    });
    dispatch({
      type: types.RESOLVE_LESSON_SUCCESS,
      payload: { id: lessonId, lesson: res.data.lesson },
    });
  } catch (error) {
    dispatch({
      type: types.RESOLVE_LESSON_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
