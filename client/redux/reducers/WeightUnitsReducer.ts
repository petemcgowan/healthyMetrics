import {WeightUnitsAction} from '../actions/index'
const initialState = 'kg'

export const weightUnits = (
  state = initialState,
  action: WeightUnitsAction,
) => {
  switch (action.type) {
    case 'UPDATE_WEIGHT_UNITS_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
