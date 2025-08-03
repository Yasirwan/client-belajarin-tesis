import * as types from "./types";
const initialState = {
  load: false,
  error: false,
  scratch: [],
  singleScratch: {},
};
export default function scratchReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_SCRATCH_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_SCRATCH_SUCCESS:
      return {
        ...state,
        scratch: [...state.scratch, payload.scratch],
      };
    case types.CREATE_SCRATCH_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SCRATCH_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SCRATCH_SUCCESS:
      return {
        ...state,
        scratch: payload.scratch,
        load: false,
      };
    case types.GET_SCRATCH_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_SCRATCH_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_SCRATCH_SUCCESS:
      return {
        ...state,
        singleScratch: payload.scratch,
        load: false,
      };
    case types.GET_SINGLE_SCRATCH_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_SCRATCH_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_SCRATCH_SUCCESS:
      return {
        ...state,
        scratch: [...state.scratch.filter((elem) => elem._id != payload.scratchId)],
        load: false,
      };
    case types.DELETE_SCRATCH_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
      // case types.RESOLVE_SCRATCH_REQUEST:
      //   return {
      //     ...state,
      //     load: true,
      //     error: false,
      //   };
      // case types.RESOLVE_SCRATCH_SUCCESS:
      //   return {
      //     ...state,
      //     scratch: state.scratch.map((elem) => {
      //       if (elem._id == payload.id) {
      //         return payload.scratch;
      //       }
      //       return elem;
      //     }),
      //     load: false,
      //   };
      // case types.RESOLVE_SCRATCH_ERROR:
      //   return {
      //     ...state,
      //     load: false,
      //     error: true,
      //   };
      case types.ADD_SCRATCH_RESPONSE_REQUEST:
        return {
          ...state,
          load: true,
          error: false,
        };
      case types.ADD_SCRATCH_RESPONSE_SUCCESS:
        return {
          ...state,
          singleScratch: payload.scratch,
          load: false,
        };
      case types.ADD_SCRATCH_RESPONSE_ERROR:
        return {
          ...state,
          load: false,
          error: true,
        };
      default:
        return state;
    }
}
