import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  test: [],
  singleTest: {},
};
export default function testReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.CREATE_TEST_ERROR:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_TEST_SUCCESS:
      return {
        ...state,
        test: [...state.test, payload.test],
      };
    case types.CREATE_TEST_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_TEST_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_TEST_SUCCESS:
      return {
        ...state,
        test: payload.test,
        load: false,
      };
    case types.GET_TEST_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_TEST_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_TEST_SUCCESS:
      return {
        ...state,
        singleTest: payload.test,
        load: false,
      };
    case types.GET_SINGLE_TEST_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_TEST_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_TEST_SUCCESS:
      return {
        ...state,
        test: [
          ...state.test.filter((elem) => elem._id != payload.testId),
        ],
        load: false,
      };
    case types.DELETE_TEST_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
