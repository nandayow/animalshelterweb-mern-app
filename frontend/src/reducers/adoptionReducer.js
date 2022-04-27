import {
  MY_ADOPTION_REQUEST,
  MY_ADOPTION_SUCCESS,
  MY_ADOPTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/adoptionConstants";

export const myAdoptionsReducer = (state = { adoptions: [] }, action) => {
  switch (action.type) {
    case MY_ADOPTION_REQUEST:
      return {
        loading: true,
      };

    case MY_ADOPTION_SUCCESS:
      return {
        loading: false,
        adoptions: action.payload,
      };

    case MY_ADOPTION_FAIL:
      return {
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
