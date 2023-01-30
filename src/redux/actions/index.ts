import { ActionType } from "../action-types";

interface HasSeenIntroAction {
  type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE;
  payload: boolean;
}

export type IntroAction = HasSeenIntroAction;

interface UpdateAgeAction {
  type: ActionType.UPDATE_AGE_VALUE;
  payload: string;
}

export type AgeAction = UpdateAgeAction; // can add more types if needed

interface UpdateFrameAction {
  type: ActionType.UPDATE_FRAME_VALUE;
  payload: string;
}

export type FrameAction = UpdateFrameAction;

interface UpdateGenderAction {
  type: ActionType.UPDATE_GENDER_VALUE;
  payload: string;
}

export type GenderAction = UpdateGenderAction;

interface UpdateHeightAction {
  type: ActionType.UPDATE_HEIGHT_VALUE;
  payload: string;
}

export type HeightAction = UpdateHeightAction;

interface UpdateHeightUnitsAction {
  type: ActionType.UPDATE_HEIGHT_UNITS_VALUE;
  payload: string;
}

export type HeightUnitsAction = UpdateHeightUnitsAction;

interface UpdateWeightPoundsAction {
  type: ActionType.UPDATE_WEIGHT_POUNDS_VALUE;
  payload: string;
}

export type WeightPoundsAction = UpdateWeightPoundsAction;

interface UpdateWeightStoneAction {
  type: ActionType.UPDATE_WEIGHT_STONE_VALUE;
  payload: string;
}

export type WeightStoneAction = UpdateWeightStoneAction;

interface UpdateWeightKgAction {
  type: ActionType.UPDATE_WEIGHT_KG_VALUE;
  payload: string;
}

export type WeightKgAction = UpdateWeightKgAction;

interface UpdateWeightUnitsAction {
  type: ActionType.UPDATE_WEIGHT_UNITS_VALUE;
  payload: string;
}

export type WeightUnitsAction = UpdateWeightUnitsAction;
