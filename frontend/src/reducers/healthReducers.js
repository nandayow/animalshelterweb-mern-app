 import {
  HEALTH_PERSONNEL_REQUEST,
  HEALTH_PERSONNEL_SUCCESS,
  HEALTH_PERSONNEL_FAIL,

  NEW_HEALTH_REQUEST,
  NEW_HEALTH_SUCCESS,
  NEW_HEALTH_FAIL,
  NEW_HEALTH_RESET,

  DELETE_HEALTH_REQUEST,
  DELETE_HEALTH_SUCCESS,
  DELETE_HEALTH_FAIL,
  DELETE_HEALTH_RESET,

  UPDATE_HEALTH_REQUEST,
  UPDATE_HEALTH_SUCCESS,
  UPDATE_HEALTH_FAIL,
  UPDATE_HEALTH_RESET,

  HEALTH_DETAILS_REQUEST,
  HEALTH_DETAILS_SUCCESS,
  HEALTH_DETAILS_FAIL,

  CLEAR_ERRORS,
} from "../constants/healthConstants";

export const healthsReducer = (state = { healths: [] }, action) => {
  switch (action.type) {
    case HEALTH_PERSONNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case HEALTH_PERSONNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        healths: action.payload,
      };

    case HEALTH_PERSONNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newHealthReducer = (state = { health: {} }, action) => {
  switch (action.type) {
    case NEW_HEALTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_HEALTH_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        health: action.payload.health,
      };

    case NEW_HEALTH_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_HEALTH_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const healthReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_HEALTH_REQUEST:
    case UPDATE_HEALTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_HEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_HEALTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_HEALTH_FAIL:
    case UPDATE_HEALTH_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_HEALTH_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_HEALTH_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}; 
  
  
export const healthDetailsReducer = (state = { health: {} }, action) => {
  switch (action.type) {
    case HEALTH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case HEALTH_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        health: action.payload,
      };

    case HEALTH_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
 