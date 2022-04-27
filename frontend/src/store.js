import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  healthsReducer,
  healthDetailsReducer,
  newHealthReducer,
  healthReducer,
} from "./reducers/healthReducers";

import {
  allUsersReducer,
  userReducer,
  authReducer,
  newPersonnelReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  animalsReducer,
  animalReducer,
  newAnimalReducer,
  animalDetailsReducer,
  newReviewReducer,
  reviewReducer,
  animalReviewsReducer,
  newAdoptionReducer,
  adoptionsReducer,
  animalChartsReducer,
  adoptedChartReducer,
} from "./reducers/animalReducers";

import { myAdoptionsReducer } from "./reducers/adoptionReducer";

const reducer = combineReducers({
  allHealth: healthsReducer,
  newHealth: newHealthReducer,
  health: healthReducer,
  healthDetails: healthDetailsReducer,

  allUsers: allUsersReducer,
  user: userReducer,
  auth: authReducer,
  newPersonnel: newPersonnelReducer,
  userDetails: userDetailsReducer,

  animals: animalsReducer,
  animal: animalReducer,
  newAnimal: newAnimalReducer,
  animalDetails: animalDetailsReducer,

  newReview: newReviewReducer,
  animalReviews: animalReviewsReducer,
  review: reviewReducer,

  newAdopt: newAdoptionReducer,
  adoptions: adoptionsReducer,

  myAdoptions: myAdoptionsReducer,

  animalCharts: animalChartsReducer,
  adoptedChart: adoptedChartReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
