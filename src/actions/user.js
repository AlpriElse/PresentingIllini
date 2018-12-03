import { SET_USER } from '../constants/ActionTypes'

export const setUser = (user) => dispatch => {
  return (
    dispatch({
      type: SET_USER,
      user: user
    })
  )
}
