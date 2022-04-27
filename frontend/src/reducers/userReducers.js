import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  DELETE_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  NEW_PERSONNEL_REQUEST,
  NEW_PERSONNEL_SUCCESS,
  NEW_PERSONNEL_RESET,
  NEW_PERSONNEL_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
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

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_STATUS_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_STATUS_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_USER_FAIL:
    case UPDATE_STATUS_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
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

export const newPersonnelReducer = (state = { personnel: {} }, action) => {
  switch (action.type) {
    case NEW_PERSONNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_PERSONNEL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        personnel: action.payload.personnel,
      };

    case NEW_PERSONNEL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_PERSONNEL_RESET:
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
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
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
