import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  lesson: [],
};
export default function lessonReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_LESSON_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_LESSON_SUCCESS:
      return {
        ...state,
        lesson: [...state.lesson, payload.lesson],
      };
    case types.CREATE_LESSON_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_LESSON_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_LESSON_SUCCESS:
      return {
        ...state,
        lesson: payload.lesson,
        load: false,
      };
    case types.GET_LESSON_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_LESSON_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lesson: [...state.lesson.filter((elem) => elem._id != payload.lessonId)],
        load: false,
      };
    case types.DELETE_LESSON_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
      case types.RESOLVE_LESSON_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.RESOLVE_LESSON_SUCCESS:
      return {
        ...state,
        lesson: state.lesson.map((elem) => {
          if (elem._id == payload.id) {
            return payload.lesson;
          }
          return elem;
        }),
        load: false,
      };
    case types.RESOLVE_LESSON_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
