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
  DELETE_ANIMAL_RESET,
  NEW_ANIMAL_REQUEST,
  NEW_ANIMAL_SUCCESS,
  NEW_ANIMAL_FAIL,
  NEW_ANIMAL_RESET,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCCESS,
  ANIMAL_DETAILS_FAIL,
  UPDATE_ANIMAL_REQUEST,
  UPDATE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_RESET,
  UPDATE_ANIMAL_FAIL,
  UPDATE_HEALTH_REQUEST,
  UPDATE_HEALTH_SUCCESS,
  UPDATE_HEALTH_FAIL,
  NEW_ADOPTION_REQUEST,
  NEW_ADOPTION_SUCCESS,
  NEW_ADOPTION_FAIL,
  NEW_ADOPTION_RESET,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  ALL_ADOPTION_REQUEST,
  ALL_ADOPTION_SUCCESS,
  ALL_ADOPTION_FAIL,
  UPDATE_ADOPTION_REQUEST,
  UPDATE_ADOPTION_SUCCESS,
  UPDATE_ADOPTION_RESET,
  UPDATE_ADOPTION_FAIL,
  TRASH_ADOPTION_REQUEST,
  TRASH_ADOPTION_SUCCESS,
  TRASH_ADOPTION_RESET,
  TRASH_ADOPTION_FAIL,
  CHART_RESCUED_REQUEST,
  CHART_RESCUED_SUCCESS,
  CHART_RESCUED_FAIL,
  CHART_ADOPTED_REQUEST,
  CHART_ADOPTED_SUCCESS,
  CHART_ADOPTED_FAIL,
  CLEAR_ERRORS,
} from "../constants/animalConstant";

export const animalsReducer = (state = { animals: [] }, action) => {
  switch (action.type) {
    case ALL_ANIMAL_REQUEST:
    case PERSONNEL_ANIMAL_REQUEST:
      return {
        // ...state,
        loading: true,
        animals: [],
      };

    case ALL_ANIMAL_SUCCESS:
      return {
        loading: false,
        animals: action.payload.animals,
        animalsCount: action.payload.animalsCount,
        resPerPage: action.payload.resPerPage,
        filteredAnimalsCount: action.payload.filteredAnimalsCount,
      };
    case ALL_ANIMAL_FAIL:
    case PERSONNEL_ANIMAL_FAIL:
      return {
        // ...state,
        loading: false,
        error: action.payload,
      };
    case PERSONNEL_ANIMAL_SUCCESS:
      return {
        // ...state,
        loading: false,
        animals: action.payload,
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

export const adoptionsReducer = (state = { adoptions: [] }, action) => {
  switch (action.type) {
    case ALL_ADOPTION_REQUEST:
      return {
        // ...state,
        loading: true,
        adoptions: [],
      };

    case ALL_ADOPTION_FAIL:
      return {
        // ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_ADOPTION_SUCCESS:
      return {
        // ...state,
        loading: false,
        adoptions: action.payload,
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

export const animalReducer = (state = {}, action) => {
  switch (action.type) {
    case TRASH_ADOPTION_REQUEST:
    case UPDATE_ADOPTION_REQUEST:
    case UPDATE_HEALTH_REQUEST:
    case DELETE_ANIMAL_REQUEST:
    case UPDATE_ANIMAL_REQUEST:
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    case UPDATE_ADOPTION_SUCCESS:
    case UPDATE_HEALTH_SUCCESS:
    case UPDATE_ANIMAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ADOPTION_RESET:
    case UPDATE_ANIMAL_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case TRASH_ADOPTION_FAIL:
    case UPDATE_ADOPTION_FAIL:
    case DELETE_ANIMAL_FAIL:
    case UPDATE_HEALTH_FAIL:
    case UPDATE_ANIMAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ANIMAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case TRASH_ADOPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isTrashed: action.payload,
      };
    case DELETE_ANIMAL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case TRASH_ADOPTION_RESET:
      return {
        ...state,
        isTrashed: false,
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

export const newAnimalReducer = (state = { animal: {} }, action) => {
  switch (action.type) {
    case NEW_ANIMAL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ANIMAL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        animal: action.payload.animal,
      };

    case NEW_ANIMAL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_ANIMAL_RESET:
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
export const animalDetailsReducer = (state = { animal: {} }, action) => {
  switch (action.type) {
    case ANIMAL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ANIMAL_DETAILS_SUCCESS:
      return {
        loading: false,
        animal: action.payload,
      };

    case ANIMAL_DETAILS_FAIL:
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
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
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
export const animalReviewsReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case GET_REVIEWS_FAIL:
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
export const newAdoptionReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ADOPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_ADOPTION_SUCCESS:
      return {
        loading: false,
        isAdopted: action.payload,
      };

    case NEW_ADOPTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_ADOPTION_RESET:
      return {
        ...state,
        isAdopted: false,
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
export const animalChartsReducer = (state = { animals: [] }, action) => {
  switch (action.type) {
    case CHART_RESCUED_REQUEST:
      return {
        ...state,
        loading: true,
        animals: [],
      };
    case CHART_RESCUED_SUCCESS:
      return {
        ...state,
        loading: false,
        animals: action.payload,
      };
    case CHART_RESCUED_FAIL:
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

export const adoptedChartReducer = (state = { adopted: [] }, action) => {
  switch (action.type) {
    case CHART_ADOPTED_REQUEST:
      return {
        ...state,
        loading: true,
        // adopted: {},
      };
    case CHART_ADOPTED_SUCCESS:
      return {
        ...state,
        loading: false,
        adopted: action.payload,
      };
    case CHART_ADOPTED_FAIL:
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
