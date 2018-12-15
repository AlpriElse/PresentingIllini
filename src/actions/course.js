import { makeActionCreator } from './util.js'
import { CREATE_COURSE, FETCH_ALL_COURSES, FETCH_COURSE } from '../constants/ActionTypes'
import { firestore } from '../firebase/fire'

/**
 *  Creating a new course.
 */
const addCourseRequest = makeActionCreator(
	CREATE_COURSE.REQUEST,
	'course'
)

const addCourseSuccess =  makeActionCreator(
	CREATE_COURSE.SUCCESS,
	'course'
)

const addCourseFailure = makeActionCreator(
	CREATE_COURSE.FAILURE,
	'data'
)

export const addCourse = (course, cb) => (dispatch) => {
	dispatch(addCourseRequest(course))
	return firestore.addCourse(course).then(
		res => {
			cb('Success')
			dispatch(addCourseSuccess(res))
		},
		err => {
			cb('Error')
			console.log(err)
			dispatch(addCourseFailure(err))
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
	'courses'
)

const fetchAllCoursesFailure = makeActionCreator(
	FETCH_ALL_COURSES.SUCCESS,
	'data'
)

export const fetchAllCourses = () => (dispatch) => {
	dispatch(fetchAllCoursesRequest())
	return firestore.fetchAllCourses().then(
		res => {
			dispatch(fetchAllCoursesSuccess(res))
		},
		err => {
			dispatch(fetchAllCoursesFailure(err))
		}
	)
}

/**
 *  Loading all courses.
 */

const fetchCourseRequest = makeActionCreator(
	FETCH_COURSE.REQUEST
)

const fetchCourseSuccess = makeActionCreator(
	FETCH_COURSE.SUCCESS,
	'course'
)

const fetchCourseFailure = makeActionCreator(
	FETCH_COURSE.FAILURE,
	'data'
)

export const fetchCourse = (course_id) => (dispatch) => {
	dispatch(fetchCourseRequest())
	return firestore.fetchCourse(course_id).then(
		res => {
			dispatch(fetchCourseSuccess(res))
		},
		err => {
			dispatch(fetchCourseFailure(err))
		}
	)
}
