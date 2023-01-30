import { HeightAction } from "../actions/index";
const initialState = "174";

export const heightCm = (state = initialState, action: HeightAction) => {
  switch (action.type) {
    case "UPDATE_HEIGHT_CM":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const heightFt = (state = initialState, action: HeightAction) => {
  switch (action.type) {
    case "UPDATE_HEIGHT_FT":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const heightInches = (state = initialState, action: HeightAction) => {
  switch (action.type) {
    case "UPDATE_HEIGHT_INCHES":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
