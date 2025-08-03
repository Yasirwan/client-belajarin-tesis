import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  assignment: [],
  singleAssignment: {},
};
export default function assignmentReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.CREATE_ASSIGNMENT_ERROR:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignment: [...state.assignment, payload.assignment],
      };
    case types.CREATE_ASSIGNMENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_ASSIGNMENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignment: payload.assignment,
        load: false,
      };
    case types.GET_ASSIGNMENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_ASSIGNMENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        singleAssignment: payload.assignment,
        load: false,
      };
    case types.GET_SINGLE_ASSIGNMENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_ASSIGNMENT_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignment: [
          ...state.assignment.filter((elem) => elem._id != payload.assignmentId),
        ],
        load: false,
      };
    case types.DELETE_ASSIGNMENT_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
