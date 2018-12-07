import { CREATE_COURSE, FETCH_ALL_COURSES } from '../constants/ActionTypes'

/**
 *  Creating a new course.
 */

export const createCourseRequest = (course) => {
  return ({
    type: CREATE_COURSE.REQUEST,
    course
  })
}

export const createCourseSuccess = (course) => {
  return ({
    type: CREATE_COURSE.SUCCESS,
    course
  })
}

export const createCourseFailure = (data) => {
  return ({
    type: CREATE_COURSE.FAILURE,
    data
  })
}

export const createCourse = (course, cb) => (dispatch) => {
  dispatch(createCourseRequest(course))
  return fetch('http://localhost:3000/api/createCourse', {
    method: "POST",
    body: JSON.stringify(course),
    headers: {
      "Content-Type": "application/json",
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

export const fetchAllCoursesRequest = () => {
  return ({
    type: FETCH_ALL_COURSES.REQUEST
  })
}

export const fetchAllCoursesSuccess = (courses) => {
  return ({
    type: FETCH_ALL_COURSES.SUCCESS,
    courses
  })
}

export const fetchAllCoursesFailure = (data) => {
  return ({
    type: FETCH_ALL_COURSES.FAILURE,
    data
  })
}

export const fetchAllCourses = (cb) => (dispatch) => {
  dispatch(fetchAllCoursesRequest())
  return fetch('http://localhost:3000/api/course/all', {
    method: "GET"
  }).then(
      res => {
        console.log(res)
        dispatch(fetchAllCoursesSuccess(res.data))
        return res.json()
      },
      err => {
        cb("Error", {})
        dispatch(fetchAllCoursesFailure(err))
      }
    ).then((json) => {
      cb("Success", json)
    })
}
