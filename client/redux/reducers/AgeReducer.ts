import {AgeAction} from '../actions/index'

const initialState = '24'

export const age = (state: string = initialState, action: AgeAction) => {
  switch (action.type) {
    case 'UPDATE_AGE_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
