import { makeActionCreator } from './util.js'
import { CREATE_COURSE, FETCH_ALL_COURSES, FETCH_COURSE } from '../constants/ActionTypes'

/**
 *  Creating a new course.
 */
const createCourseRequest = makeActionCreator(
  CREATE_COURSE.REQUEST,
  "course"
)

const createCourseSuccess =  makeActionCreator(
  CREATE_COURSE.SUCCESS,
  "course"
)

const createCourseFailure = makeActionCreator(
  CREATE_COURSE.FAILURE,
  "data"
)

export const createCourse = (course, cb) => (dispatch) => {
  dispatch(createCourseRequest(course))
  return fetch('http://localhost:3000/api/createCourse', {
    method: "POST",
    body: JSON.stringify(course),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(
      res => {
        cb("Success")
        dispatch(createCourseSuccess(res.data))
      },
      err => {
        cb("Error")
        dispatch(createCourseFailure(err))
      }
    )
}

/**
 *  Loading all courses.
 */

const fetchAllCoursesRequest = makeActionCreator(
  FETCH_ALL_COURSES.REQUEST
)

const fetchAllCoursesSuccess = makeActionCreator(
  FETCH_ALL_COURSES.SUCCESS,
  "courses"
)

const fetchAllCoursesFailure = makeActionCreator(
  FETCH_ALL_COURSES.SUCCESS,
  "data"
)

export const fetchAllCourses = (cb) => (dispatch) => {
  dispatch(fetchAllCoursesRequest())
  return fetch('http://localhost:3000/api/course/all', {
    method: "GET"
  }).then(
      res => {
        return res.json()
      },
      err => {
        cb("Error", {})
        dispatch(fetchAllCoursesFailure(err))
      }
    ).then((json) => {
      dispatch(fetchAllCoursesSuccess(json))
      cb("Success", json)
    })
}

/**
 *  Loading all courses.
 */

const fetchCourseRequest = () => {
  return ({
    type: FETCH_COURSE.REQUEST
  })
}

const fetchCourseSuccess = (courses) => {
  return ({
    type: FETCH_COURSE.SUCCESS,
    courses
  })
}

const fetchCourseFailure = (data) => {
  return ({
    type: FETCH_COURSE.FAILURE,
    data
  })
}

export const fetchCourse = (course_id, cb) => (dispatch) => {
  dispatch(fetchCourseRequest())
  console.log("fetching")
  return fetch('http://localhost:3000/api/course/' + course_id, {
    method: "GET"
  }).then(
      res => {
        return res.json()
      },
      err => {
        cb("Error", {})
        dispatch(fetchCourseFailure(err))
      }
    ).then((json) => {
      console.log("Here")
      dispatch(fetchCourseSuccess(json))
      cb("Success", json)
    })
}
