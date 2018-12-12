import { makeActionCreator } from './util.js'
import { ADD_LECTURE, FETCH_ALL_LECTURES, FETCH_LECTURE } from '../constants/ActionTypes'
import { cloudstore, firestore } from '../firebase/fire'

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

export const LECTURE = {
  ADD: (lecture, cb) => (dispatch) => {
    dispatch(addLectureRequest(lecture))
    return cloudstore.uploadLecture(lecture.slides).then(
      res => {
        cb("Success")
        dispatch(addLectureSuccess(lecture))
      },
      err => {
        cb("Error")
        dispatch(addLectureFailure(err))
      }
    )
  }
}
