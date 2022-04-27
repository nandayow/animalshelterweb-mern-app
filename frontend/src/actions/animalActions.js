import axios from "axios";

import {
  ALL_ANIMAL_REQUEST,
  ALL_ANIMAL_SUCCESS,
  ALL_ANIMAL_FAIL,
  PERSONNEL_ANIMAL_REQUEST,
  PERSONNEL_ANIMAL_SUCCESS,
  PERSONNEL_ANIMAL_FAIL,
  DELETE_ANIMAL_REQUEST,
  DELETE_ANIMAL_SUCCESS,
  DELETE_ANIMAL_FAIL,
  NEW_ANIMAL_REQUEST,
  NEW_ANIMAL_SUCCESS,
  NEW_ANIMAL_FAIL,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCCESS,
  ANIMAL_DETAILS_FAIL,
  UPDATE_ANIMAL_REQUEST,
  UPDATE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_FAIL,
  UPDATE_HEALTH_REQUEST,
  UPDATE_HEALTH_SUCCESS,
  UPDATE_HEALTH_FAIL,
  NEW_ADOPTION_REQUEST,
  NEW_ADOPTION_SUCCESS,
  NEW_ADOPTION_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  ALL_ADOPTION_REQUEST,
  ALL_ADOPTION_SUCCESS,
  ALL_ADOPTION_FAIL,
  UPDATE_ADOPTION_REQUEST,
  UPDATE_ADOPTION_SUCCESS,
  UPDATE_ADOPTION_FAIL,
  TRASH_ADOPTION_REQUEST,
  TRASH_ADOPTION_SUCCESS,
  TRASH_ADOPTION_FAIL,
  CHART_RESCUED_REQUEST,
  CHART_RESCUED_SUCCESS,
  CHART_RESCUED_FAIL,
  CHART_ADOPTED_REQUEST,
  CHART_ADOPTED_SUCCESS,
  CHART_ADOPTED_FAIL,
  CLEAR_ERRORS,
} from "../constants/animalConstant";

export const getAnimals =
  (keyword = "", currentPage = 1, age, category, breed, gender, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_ANIMAL_REQUEST,
      });
      let link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}&category=${category}&ratings[gte]=${rating}`;
      }
      if (breed) {
        link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}&category=${category}&breed=${breed}&ratings[gte]=${rating}`;
      }
      if (gender) {
        link = `/api/v1/animals?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}&category=${category}&gender=${gender}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_ANIMAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ANIMAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getPersonnelAnimals = () => async (dispatch) => {
  try {
    dispatch({ type: PERSONNEL_ANIMAL_REQUEST });

    const { data } = await axios.get(`/api/v1/personnel/animals`);

    dispatch({
      type: PERSONNEL_ANIMAL_SUCCESS,
      payload: data.animals,
    });
  } catch (error) {
    dispatch({
      type: PERSONNEL_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getChartRescued = () => async (dispatch) => {
  try {
    dispatch({ type: CHART_RESCUED_REQUEST });

    const { data } = await axios.get(`/api/v1/chart/rescued`);

    dispatch({
      type: CHART_RESCUED_SUCCESS,
      payload: data.animals,
    });
  } catch (error) {
    dispatch({
      type: CHART_RESCUED_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getChartAdopted = () => async (dispatch) => {
  try {
    dispatch({ type: CHART_ADOPTED_REQUEST });

    const { data } = await axios.get(`/api/v1/chart/adopted`);

    dispatch({
      type: CHART_ADOPTED_SUCCESS,
      payload: data.adopted,
    });
  } catch (error) {
    dispatch({
      type: CHART_ADOPTED_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdoptionAnimals = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADOPTION_REQUEST });

    const { data } = await axios.get(`/api/v1/personnel/adoptions`);

    dispatch({
      type: ALL_ADOPTION_SUCCESS,
      payload: data.animals,
    });
  } catch (error) {
    dispatch({
      type: ALL_ADOPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteAnimal = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ANIMAL_REQUEST });

    const { data } = await axios.delete(`/api/v1/personnel/animal/${id}`);

    dispatch({
      type: DELETE_ANIMAL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newAnimal = (animalData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ANIMAL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/personnel/animal/new`,
      animalData,
      config
    );

    dispatch({
      type: NEW_ANIMAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAnimalDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ANIMAL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/personnel/animal/${id}`);

    dispatch({
      type: ANIMAL_DETAILS_SUCCESS,
      payload: data.animal,
    });
  } catch (error) {
    dispatch({
      type: ANIMAL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAnimal = (id, animalData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ANIMAL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/personnel/animal/${id}`,
      animalData,
      config
    );

    dispatch({
      type: UPDATE_ANIMAL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ANIMAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAnimalStatus = (id, animalData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_HEALTH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/personnel/animal/status/${id}`,
      animalData,
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

export const updateAdoptionStatus = (id, animalData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADOPTION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/adopt/${id}`, animalData, config);

    dispatch({
      type: UPDATE_ADOPTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADOPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const trashAdoptionStatus = (id, animalData) => async (dispatch) => {
  try {
    dispatch({ type: TRASH_ADOPTION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/adopt/trash/${id}`,
      animalData,
      config
    );

    dispatch({
      type: TRASH_ADOPTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: TRASH_ADOPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const newAdopt = (adoptionData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ADOPTION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/adopt`, adoptionData, config);

    dispatch({
      type: NEW_ADOPTION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADOPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAnimalReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReview = (id, animalId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${id}&productId=${animalId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
