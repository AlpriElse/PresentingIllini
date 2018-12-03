import {actionTypes} from '../constants/ActionTypes'
import { SET_USER } from '../constants/ActionTypes'
import {exampleInitialState} from '../redux/initialState'

const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      })
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1
      })
    case actionTypes.RESET:
      return Object.assign({}, state, {
        count: exampleInitialState.count
      })
    case SET_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    default: return state
  }
}
export default reducer
