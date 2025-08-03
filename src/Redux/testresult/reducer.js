import * as types from "./types";

// Define the initial state
const initialState = {
    testResults: [],
    load: false,
    error: false
};

// Create the reducer function
const testResultReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case types.SAVE_TEST_RESULT:
            return {
                ...state,
                testResults: payload
            };
        case types.GET_TEST_RESULT:
            return {
                ...state,
                testResults: payload.data,
                load: false
            };
        case types.GET_TEST_RESULT_ERROR:
            return {
                ...state,
                error: true
            };
        case types.GET_TEST_RESULT_REQUEST:
            return {
                ...state,
                load: true,
                error: false
            };
        default:
            return state;
    }
};

export default testResultReducer;
