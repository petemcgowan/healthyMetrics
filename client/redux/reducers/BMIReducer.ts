import {BMIAction} from '../actions/index'
const initialState = ''

export const bmiCalcResult = (state = initialState, action: BMIAction) => {
  switch (action.type) {
    case 'UPDATE_BMI_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
