import { makeActionCreator } from './util.js'
import { ADD_LECTURE, FETCH_ALL_LECTURES, FETCH_LECTURE } from '../constants/ActionTypes'


const addLectureRequest = makeActionCreator(
  ADD_LECTURE.REQUEST,
  "lecture"
)

const addLectureSuccess = makeActionCreator(
  ADD_LECTURE.SUCCESS,
  "lecture"
)

const addLectureFailure = makeActionCreator(
  ADD_LECTURE.FAILURE,
  "data"
)

export const addLecture = (lecture, cb) => (dispatch) => {
  dispatch(addLectureRequest(lecture))
  return fetch('http://localhost:3000/api/addLecture', {
    method: "POST",
    body: JSON.stringify(lecture),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(
    res => {
      cb("Success")
      dispatch(addLectureSuccess(res.data))
    },
    err => {
      cb("Error")
      dispatch(addLectureFailure(res.data))
    }
  )
}
