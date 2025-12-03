import {
  HeightCmAction,
  HeightFtAction,
  HeightInchesAction,
} from '../actions/index'
const heightCmInitialState = '174'
const heightFtInitialState = '5'
const heightInchesInitialState = '10'

export const heightCm = (
  state = heightCmInitialState,
  action: HeightCmAction,
) => {
  switch (action.type) {
    case 'UPDATE_HEIGHT_CM':
      state = action.payload
      return state
    default:
      return state
  }
}

export const heightFt = (
  state = heightFtInitialState,
  action: HeightFtAction,
) => {
  switch (action.type) {
    case 'UPDATE_HEIGHT_FT':
      state = action.payload
      return state
    default:
      return state
  }
}

export const heightInches = (
  state = heightInchesInitialState,
  action: HeightInchesAction,
) => {
  switch (action.type) {
    case 'UPDATE_HEIGHT_INCHES':
      state = action.payload
      return state
    default:
      return state
  }
}
