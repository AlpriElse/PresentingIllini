import {
	SET_USER,
	FETCH_ALL_COURSES,
	FETCH_ALL_LECTURES,
	FETCH_COURSE,
	FETCH_LECTURE_SLIDES,
	FETCH_LECTURE } from '../constants/ActionTypes'

import { initialState } from '../redux/initialState'

const reducer = (state = initialState, action) => {
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
	case FETCH_ALL_LECTURES.REQUEST:
	case FETCH_ALL_LECTURES.SUCCESS:
	case FETCH_ALL_LECTURES.FAILURE:
		return fetchAllLecturesHandler(state, action)
	case FETCH_LECTURE.REQUEST:
	case FETCH_LECTURE.SUCCESS:
	case FETCH_LECTURE.FAILURE:
		return fetchLectureHandler(state, action)
	case FETCH_LECTURE_SLIDES.REQUEST:
	case FETCH_LECTURE_SLIDES.SUCCESS:
	case FETCH_LECTURE_SLIDES.FAILURE:
		return fetchLectureSlidesHandler(state, action)
	default: return state
	}
}

const fetchAllCoursesHandler = (state, action) => {
	switch (action.type) {
	case FETCH_ALL_COURSES.REQUEST:
		return Object.assign({}, state, {
			courses: {
				isFetching: true,
				...state.courses
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
		return state
	}
}

const fetchCourseHandler = (state, action) => {
	switch (action.type) {
	case FETCH_COURSE.REQUEST:
		return Object.assign({}, state, {
			courses: {
				isFetching: true,
				...state.courses
			}
		})
	case FETCH_COURSE.SUCCESS:
		return Object.assign({}, state, {
			courses: {
				isFetching: false,
				invalid: false,
				items: state.courses.items.concat(action.course)
			}
		})
	case FETCH_COURSE.FAILURE:
		//  TODO: Handle Failures
		return state
	}
}

const fetchAllLecturesHandler = (state, action) => {
	switch (action.type) {
	case FETCH_ALL_LECTURES.REQUEST:
		return Object.assign({}, state, {
			lectures: {
				isFetching: true,
				...state.lectures
			}
		})
	case FETCH_ALL_LECTURES.SUCCESS:
		return Object.assign({}, state, {
			lectures: {
				isFetching: false,
				invalid: false,
				items: action.lectures
			}
		})
	case FETCH_ALL_LECTURES.FAILURE:
		//  TODO: Handle Failures
		return state
	}
}

const fetchLectureHandler = (state, action) => {
	switch (action.type) {
	case FETCH_LECTURE.REQUEST:
		return Object.assign({}, state, {
			lectures: {
				isFetching: true,
				...state.lectures
			}
		})
	case FETCH_LECTURE.SUCCESS:
		return Object.assign({}, state, {
			lectures: {
				isFetching: false,
				invalid: false,
				items: state.lectures.concat(action.lecture)
			}
		})
	case FETCH_LECTURE.FAILURE:
		return Object.assign({}, state, {
			lectures: {
				isFetching: false,
				...state.lectures
			}
		})
	}
}

const fetchLectureSlidesHandler = (state, action) => {
	switch (action.type) {
	case FETCH_LECTURE_SLIDES.REQUEST:
		return Object.assign({}, state, {
			slides: {
				isFetching: true,
				...state.slides
			}
		})
	case FETCH_LECTURE_SLIDES.SUCCESS:
		return Object.assign({}, state, {
			slides: {
				isFetching: false,
				invalid: false,
				items: action.slides
			}
		})
	case FETCH_LECTURE_SLIDES.FAILURE:
		return Object.assign({}, state, {
			slides: {
				isFetching: false,
				invalid: true,
				...state.slides
			}
		})
	}
}


export default reducer
