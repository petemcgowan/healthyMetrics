import { Dispatch } from "redux";

import { ActionType } from "../action-types/index";

export const setHeightCm = (heightCm: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_HEIGHT_CM,
      payload: heightCm,
    });
  };
};

export const setHeightInches = (heightInches: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_HEIGHT_INCHES,
      payload: heightInches,
    });
  };
};

export const setHeightFt = (heightFt: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_HEIGHT_FT,
      payload: heightFt,
    });
  };
};

export const setWeightPounds = (weightPounds: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_WEIGHT_POUNDS_VALUE,
      payload: weightPounds,
    });
  };
};

export const setWeightStones = (weightStones: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_WEIGHT_STONES_VALUE,
      payload: weightStones,
    });
  };
};

export const setWeightKg = (weightKg: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_WEIGHT_KG_VALUE,
      payload: weightKg,
    });
  };
};

export const setFrame = (frame: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_FRAME_VALUE,
      payload: frame,
    });
  };
};

export const setGender = (gender: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_GENDER_VALUE,
      payload: gender,
    });
  };
};

export const setAge = (age: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_AGE_VALUE,
      payload: age,
    });
  };
};

export const setHeightUnits = (heightUnits: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_HEIGHT_UNITS_VALUE,
      payload: heightUnits,
    });
  };
};

export const setWeightUnits = (weightUnits: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_WEIGHT_UNITS_VALUE,
      payload: weightUnits,
    });
  };
};