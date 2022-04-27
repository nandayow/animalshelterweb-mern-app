import axios from "axios";

import {
  MY_ADOPTION_REQUEST,
  MY_ADOPTION_SUCCESS,
  MY_ADOPTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/adoptionConstants";

export const myAdoptions = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ADOPTION_REQUEST });
    const { data } = await axios.get("/api/v1/adoptions/me");
    dispatch({
      type: MY_ADOPTION_SUCCESS,
      payload: data.adoptions,
    });
  } catch (error) {
    dispatch({
      type: MY_ADOPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
