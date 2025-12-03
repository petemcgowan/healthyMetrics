import {GenderAction} from '../actions/index'

const initialState = ''

export const gender = (state = initialState, action: GenderAction) => {
  switch (action.type) {
    case 'UPDATE_GENDER_VALUE':
      state = action.payload
      return action.payload
    default:
      return state
  }
}
