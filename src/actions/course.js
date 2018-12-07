import { CREATE_COURSE, FETCH_ALL_COURSES, FETCH_COURSE } from '../constants/ActionTypes'

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

export const fetchCourseRequest = () => {
  return ({
    type: FETCH_COURSE.REQUEST
  })
}

export const fetchCourseSuccess = (courses) => {
  return ({
    type: FETCH_COURSE.SUCCESS,
    courses
  })
}

export const fetchCourseFailure = (data) => {
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
