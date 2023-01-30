import {
  WeightPoundsAction,
  WeightStonesAction,
  WeightKgAction,
} from "../actions/index";
const initialState = "157";

export const weightPounds = (
  state = initialState,
  action: WeightPoundsAction
) => {
  switch (action.type) {
    case "UPDATE_WEIGHT_POUNDS_VALUE":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const weightStones = (
  state = initialState,
  action: WeightStonesAction
) => {
  switch (action.type) {
    case "UPDATE_WEIGHT_STONES_VALUE":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const weightKg = (state = initialState, action: WeightKgAction) => {
  switch (action.type) {
    case "UPDATE_WEIGHT_KG_VALUE":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
