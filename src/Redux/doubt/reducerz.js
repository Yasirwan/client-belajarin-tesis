import * as types from "./typesz";
const initialState = {
  load: false,
  error: false,
  doubtz: [],
  singleDoubtz: {},
};
export default function doubtzReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_DOUBTZ_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_DOUBTZ_SUCCESS:
      return {
        ...state,
        doubtz: [...state.doubtz, payload.doubtz],
      };
    case types.CREATE_DOUBTZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_DOUBTZ_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_DOUBTZ_SUCCESS:
      return {
        ...state,
        doubtz: payload.doubtz,
        load: false,
      };
    case types.GET_DOUBTZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_DOUBTZ_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_DOUBTZ_SUCCESS:
      return {
        ...state,
        singleDoubtz: payload.doubtz,
        load: false,
      };
    case types.GET_SINGLE_DOUBTZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_DOUBTZ_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_DOUBTZ_SUCCESS:
      return {
        ...state,
        doubtz: [...state.doubtz.filter((elem) => elem._id != payload.doubtzId)],
        load: false,
      };
    case types.DELETE_DOUBTZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };

    case types.RESOLVE_DOUBTZ_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.RESOLVE_DOUBTZ_SUCCESS:
      return {
        ...state,
        doubtz: state.doubtz.map((elem) => {
          if (elem._id == payload.id) {
            return payload.doubtz;
          }
          return elem;
        }),
        load: false,
      };
    case types.RESOLVE_DOUBTZ_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.ADD_DOUBTZ_RESPONSE_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.ADD_DOUBTZ_RESPONSE_SUCCESS:
      return {
        ...state,
        singleDoubtz: payload.doubtz,
        load: false,
      };
    case types.ADD_DOUBTZ_RESPONSE_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
