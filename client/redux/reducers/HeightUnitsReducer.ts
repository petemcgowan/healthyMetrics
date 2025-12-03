import {HeightUnitsAction} from '../actions/index'
const initialState = 'cm'

export const heightUnits = (
  state = initialState,
  action: HeightUnitsAction,
) => {
  switch (action.type) {
    case 'UPDATE_HEIGHT_UNITS_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
