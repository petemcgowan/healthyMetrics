import {ActionType} from '../action-types'

interface HasSeenIntroAction {
  type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE
  payload: boolean
}

export type IntroAction = HasSeenIntroAction

interface UpdateAgeAction {
  type: ActionType.UPDATE_AGE_VALUE
  payload: string
}

export type AgeAction = UpdateAgeAction

interface UpdateFrameAction {
  type: ActionType.UPDATE_FRAME_VALUE
  payload: string
}

export type FrameAction = UpdateFrameAction

interface UpdateGenderAction {
  type: ActionType.UPDATE_GENDER_VALUE
  payload: string
}

export type GenderAction = UpdateGenderAction

interface UpdateHeightCmAction {
  type: ActionType.UPDATE_HEIGHT_CM
  payload: string
}

export type HeightCmAction = UpdateHeightCmAction

interface UpdateHeightFtAction {
  type: ActionType.UPDATE_HEIGHT_FT
  payload: string
}

export type HeightFtAction = UpdateHeightFtAction

interface UpdateHeightInchesAction {
  type: ActionType.UPDATE_HEIGHT_INCHES
  payload: string
}

export type HeightInchesAction = UpdateHeightInchesAction

interface UpdateHeightUnitsAction {
  type: ActionType.UPDATE_HEIGHT_UNITS_VALUE
  payload: string
}

export type HeightUnitsAction = UpdateHeightUnitsAction

interface UpdateWeightPoundsAction {
  type: ActionType.UPDATE_WEIGHT_POUNDS_VALUE
  payload: string
}

export type WeightPoundsAction = UpdateWeightPoundsAction

interface UpdateWeightPoundsOnlyAction {
  type: ActionType.UPDATE_WEIGHT_POUNDS_ONLY_VALUE
  payload: string
}

export type WeightPoundsOnlyAction = UpdateWeightPoundsOnlyAction

interface UpdateWeightStonesAction {
  type: ActionType.UPDATE_WEIGHT_STONES_VALUE
  payload: string
}

export type WeightStonesAction = UpdateWeightStonesAction

interface UpdateWeightKgAction {
  type: ActionType.UPDATE_WEIGHT_KG_VALUE
  payload: string
}

export type WeightKgAction = UpdateWeightKgAction

interface UpdateWeightUnitsAction {
  type: ActionType.UPDATE_WEIGHT_UNITS_VALUE
  payload: string
}

export type WeightUnitsAction = UpdateWeightUnitsAction

interface UpdateIdealWeightKgAction {
  type: ActionType.UPDATE_IDEAL_WEIGHT_KG_VALUE
  payload: number
}

export type IdealWeightKgAction = UpdateIdealWeightKgAction

interface UpdateBMIAction {
  type: ActionType.UPDATE_BMI_VALUE
  payload: number
}

export type BMIAction = UpdateBMIAction
