import * as types from "./typesx";
const initialState = {
  load: false,
  error: false,
  lessonx: [],
};
export default function lessonxReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_LESSONX_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_LESSONX_SUCCESS:
      return {
        ...state,
        lessonx: [...state.lessonx, payload.lessonx],
      };
    case types.CREATE_LESSONX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_LESSONX_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_LESSONX_SUCCESS:
      return {
        ...state,
        lessonx: payload.lessonx,
        load: false,
      };
    case types.GET_LESSONX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_LESSONX_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_LESSONX_SUCCESS:
      return {
        ...state,
        lessonx: [...state.lessonx.filter((elem) => elem._id != payload.lessonxId)],
        load: false,
      };
    case types.DELETE_LESSONX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
