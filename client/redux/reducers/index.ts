import {combineReducers} from 'redux'

import {age} from './AgeReducer'
import {frame} from './FrameReducer'
import {gender} from './GenderReducer'
import {hasSeenIntro} from './HasSeenIntroReducer'
import {heightCm, heightFt, heightInches} from './HeightReducer'
import {heightUnits} from './HeightUnitsReducer'
import {
  weightPounds,
  weightStones,
  weightPoundsOnly,
  weightKg,
} from './WeightReducer'
import {weightUnits} from './WeightUnitsReducer'

import {bmiCalcResult} from './BMIReducer'
import {idealWeightKg} from './IdealWeightKgReducer'

const reducers = combineReducers({
  hasSeenIntro,
  heightCm,
  heightFt,
  heightInches,
  weightPounds,
  weightPoundsOnly,
  weightStones,
  weightKg,
  frame,
  age,
  gender,
  heightUnits,
  weightUnits,
  idealWeightKg,
  bmiCalcResult,
})

export default reducers

export type State = ReturnType<typeof reducers>
