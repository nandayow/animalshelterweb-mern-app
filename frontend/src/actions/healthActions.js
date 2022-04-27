import axios from "axios";

import {

  HEALTH_PERSONNEL_REQUEST,
  HEALTH_PERSONNEL_SUCCESS,
  HEALTH_PERSONNEL_FAIL,

  NEW_HEALTH_REQUEST,
  NEW_HEALTH_SUCCESS,
  NEW_HEALTH_FAIL,

  DELETE_HEALTH_REQUEST,
  DELETE_HEALTH_SUCCESS,
  DELETE_HEALTH_FAIL,
  
  UPDATE_HEALTH_REQUEST,
  UPDATE_HEALTH_SUCCESS,
  UPDATE_HEALTH_FAIL,

  
  HEALTH_DETAILS_REQUEST,
  HEALTH_DETAILS_SUCCESS,
  HEALTH_DETAILS_FAIL,


  CLEAR_ERRORS,

} from "../constants/healthConstants";

export const getPersonnelHealths = () => async (dispatch) => {
  try {
    dispatch({ type: HEALTH_PERSONNEL_REQUEST });

    const { data } = await axios.get(`/api/v1/personnel/healths`);

    dispatch({
      type: HEALTH_PERSONNEL_SUCCESS,
      payload: data.health,
    });
  } catch (error) {
    dispatch({
      type: HEALTH_PERSONNEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newHealth = (healthData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_HEALTH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1//personnel/health/new`,
      healthData,
      config
    );

    dispatch({
      type: NEW_HEALTH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_HEALTH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteHealth = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_HEALTH_REQUEST });

    const { data } = await axios.delete(`/api/v1/personnel/health/${id}`);

    dispatch({
      type: DELETE_HEALTH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_HEALTH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateHealth = (id, healthData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_HEALTH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/personnel/health/${id}`,
      healthData,
      config
    );

    dispatch({
      type: UPDATE_HEALTH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_HEALTH_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getHealthDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: HEALTH_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/personnel/health/${id}`);
    console.log(data);
    dispatch({
      type: HEALTH_DETAILS_SUCCESS,
      payload: data.health,
    });
  } catch (error) {
    dispatch({
      type: HEALTH_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};


