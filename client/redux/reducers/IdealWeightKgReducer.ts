import {IdealWeightKgAction} from '../actions/index'
const initialState = ''

export const idealWeightKg = (
  state = initialState,
  action: IdealWeightKgAction,
) => {
  switch (action.type) {
    case 'UPDATE_IDEAL_WEIGHT_KG_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
