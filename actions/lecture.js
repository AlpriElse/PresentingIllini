import { makeActionCreator } from './util.js'
import { ADD_LECTURE,
	FETCH_ALL_LECTURES,
	FETCH_LECTURE,
	FETCH_LECTURE_SLIDES,
 	CHANGE_PAGE } from '../constants/ActionTypes'
import { firestore, cloudstore } from '../firebase/fire'
import uniqueString from 'unique-string'

const addLectureRequest = makeActionCreator(
	ADD_LECTURE.REQUEST,
	'lecture'
)

const addLectureSuccess = makeActionCreator(
	ADD_LECTURE.SUCCESS,
	'lecture'
)

const addLectureFailure = makeActionCreator(
	ADD_LECTURE.FAILURE,
	'data'
)

const fetchAllLecturesRequest = makeActionCreator(
	FETCH_ALL_LECTURES.REQUEST
)

const fetchAllLecturesSuccess = makeActionCreator(
	FETCH_ALL_LECTURES.SUCCESS,
	'lectures'
)

const fetchAllLecturesFailure = makeActionCreator(
	FETCH_ALL_LECTURES.FAILURE,
	'data'
)

const fetchLectureRequest = makeActionCreator(
	FETCH_LECTURE.REQUEST
)

const fetchLectureSuccess = makeActionCreator(
	FETCH_LECTURE.SUCCESS,
	'lecture'
)

const fetchLectureFailure = makeActionCreator(
	FETCH_LECTURE.FAILURE,
	'data'
)

const fetchLectureSlidesRequest = makeActionCreator(
	FETCH_LECTURE_SLIDES.REQUEST
)

const fetchLectureSlidesSuccess = makeActionCreator(
	FETCH_LECTURE_SLIDES.SUCCESS,
	'slides'
)
const fetchLectureSlidesFailure = makeActionCreator(
	FETCH_LECTURE_SLIDES.FAILURE,
	'data'
)
export const Lecture = {
	add: (lecture, cb) => (dispatch) => {
		const lecture_id = uniqueString().slice(0, 16)
		let lecture_info = {
			id: lecture_id,
			title: lecture.title,
			description: lecture.description,
			slides_filename: lecture_id,
			course_id: lecture.course_id
		}
		let lecture_slides = {
			filename: lecture_id,
			file: lecture.slides
		}
		dispatch(addLectureRequest(lecture))
		return firestore.addLecture(lecture_info).then(
			res => {
				return cloudstore.uploadLectureSlides(lecture_slides).then(
					res => {
						cb('Success')
						dispatch(addLectureSuccess(lecture))
					},
					err => {
						cb('Error uploading slide files')
						console.log(err)
						dispatch(addLectureFailure(err))
					}
				)
			},
			err => {
				cb('Error uploading lecture info')
				dispatch(addLectureFailure(err))
			}
		)
	},
	fetchAll: (course_id) => (dispatch) => {
		dispatch(fetchAllLecturesRequest())
		return firestore.fetchAllLectures(course_id).then(
			res => {
				dispatch(fetchAllLecturesSuccess(res))
			},
			err => {
				console.log(err)
				dispatch(fetchAllLecturesFailure(err))
			}
		)
	},
	fetchLecture: (lecture_id) => (dispatch) => {
		dispatch(fetchLectureRequest())
		return firestore.fetchLecture(lecture_id).then(
			res => {
				dispatch(fetchLectureSuccess(res))
			},
			err => {
				console.log(err)
				dispatch(fetchLectureFailure(err))
			}
		)
	},
	fetchSlides: (lecture_id) => (dispatch) => {
		dispatch(fetchLectureSlidesRequest())
		return firestore.fetchLecture(lecture_id).then(
			res => {
				return cloudstore.fetchLectureSlides(res.slides_filename).then(
					res => {
						console.log(res)
						dispatch(fetchLectureSlidesSuccess(res))
					},
					err => {
						dispatch(fetchLectureSlidesFailure(err))
					}
				)
			},
			err => {
				console.log(err)
				dispatch(fetchLectureSlidesFailure(err))
			}
		)
	},
	changePage: page => ({
		type: CHANGE_PAGE,
		page
	})
}
