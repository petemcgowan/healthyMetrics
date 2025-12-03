import {FrameAction} from '../actions/index'

const initialState = 'Medium'

export const frame = (state = initialState, action: FrameAction) => {
  switch (action.type) {
    case 'UPDATE_FRAME_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
