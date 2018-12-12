import {
  SET_USER,
  FETCH_ALL_COURSES,
  FETCH_COURSE
} from '../constants/ActionTypes'

import {exampleInitialState} from '../redux/initialState'

const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    case FETCH_ALL_COURSES.REQUEST:
    case FETCH_ALL_COURSES.SUCCESS:
    case FETCH_ALL_COURSES.FAILURE:
      return fetchAllCoursesHandler(state, action)
    case FETCH_COURSE.REQUEST:
    case FETCH_COURSE.SUCCESS:
    case FETCH_COURSE.FAILURE:
      return fetchCourseHandler(state, action)
    default: return state
  }
}

const fetchAllCoursesHandler = (state, action) => {
  switch (action.type) {
    case FETCH_ALL_COURSES.REQUEST:
      return Object.assign({}, state, {
        courses: {
          isFetching: true
        }
      })
    case FETCH_ALL_COURSES.SUCCESS:
      return Object.assign({}, state, {
        courses: {
          isFetching: false,
          items: action.courses,
          invalid: false
        }
      })
    case FETCH_ALL_COURSES.FAILURE:
      //  TODO: Handle Failures
      break;
  }
}

const fetchCourseHandler = (state, action) => {
  console.log("ACTION:", action)
  switch (action.type) {
    case FETCH_COURSE.REQUEST:
      return Object.assign({}, state, {
        course: {
          isFetching: true
        }
      })
    case FETCH_COURSE.SUCCESS:
      return Object.assign({}, state, {
        course: {
          isFetching: false,
          invalid: false,
          items: action.course
        }
      })
    case FETCH_COURSE.FAILURE:
      //  TODO: Handle Failures
      break;
  }
}



export default reducer
