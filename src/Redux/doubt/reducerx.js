import * as types from "./typesx";
const initialState = {
  load: false,
  error: false,
  doubtx: [],
  singleDoubtx: {},
};
export default function doubtxReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_DOUBTX_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_DOUBTX_SUCCESS:
      return {
        ...state,
        doubtx: [...state.doubtx, payload.doubtx],
      };
    case types.CREATE_DOUBTX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_DOUBTX_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_DOUBTX_SUCCESS:
      return {
        ...state,
        doubtx: payload.doubtx,
        load: false,
      };
    case types.GET_DOUBTX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_DOUBTX_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_DOUBTX_SUCCESS:
      return {
        ...state,
        singleDoubtx: payload.doubtx,
        load: false,
      };
    case types.GET_SINGLE_DOUBTX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_DOUBTX_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_DOUBTX_SUCCESS:
      return {
        ...state,
        doubtx: [...state.doubtx.filter((elem) => elem._id != payload.doubtxId)],
        load: false,
      };
    case types.DELETE_DOUBTX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };

    case types.RESOLVE_DOUBTX_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.RESOLVE_DOUBTX_SUCCESS:
      return {
        ...state,
        doubtx: state.doubtx.map((elem) => {
          if (elem._id == payload.id) {
            return payload.doubtx;
          }
          return elem;
        }),
        load: false,
      };
    case types.RESOLVE_DOUBTX_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.ADD_DOUBTX_RESPONSE_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.ADD_DOUBTX_RESPONSE_SUCCESS:
      return {
        ...state,
        singleDoubtx: payload.doubtx,
        load: false,
      };
    case types.ADD_DOUBTX_RESPONSE_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
