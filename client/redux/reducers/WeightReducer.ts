import {
  WeightPoundsAction,
  WeightPoundsOnlyAction,
  WeightStonesAction,
  WeightKgAction,
} from '../actions/index'
// const initialState = '157';
const weightStonesInitialState = '5'
const weightPoundsInitialState = '157'
const weightPoundsOnlyInitialState = '0'
const weightKgInitialState = '75'

export const weightPounds = (
  state = weightPoundsInitialState,
  action: WeightPoundsAction,
) => {
  switch (action.type) {
    case 'UPDATE_WEIGHT_POUNDS_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}

export const weightPoundsOnly = (
  state = weightPoundsOnlyInitialState,
  action: WeightPoundsOnlyAction,
) => {
  switch (action.type) {
    case 'UPDATE_WEIGHT_POUNDS_ONLY_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}

export const weightStones = (
  state = weightStonesInitialState,
  action: WeightStonesAction,
) => {
  switch (action.type) {
    case 'UPDATE_WEIGHT_STONES_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}

export const weightKg = (
  state = weightKgInitialState,
  action: WeightKgAction,
) => {
  switch (action.type) {
    case 'UPDATE_WEIGHT_KG_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
