let createAsyncActionStrings = (action) => {
  return {
    REQUEST: action + "_REQUEST",
    SUCCESS: action + "_SUCCESS",
    FAILURE: action + "_FAILURE"
  }
}

//  User Actions
export const SET_USER = 'SET_USER'

//  Course Actions
export const CREATE_COURSE = createAsyncActionStrings("CREATE_COURSE")
export const FETCH_ALL_COURSES = createAsyncActionStrings("FETCH_ALL_COURSES")
export const FETCH_COURSE = createAsyncActionStrings("FETCH_COURSE")

//  Lecture Actions
export const ADD_LECTURE = createAsyncActionStrings("ADD_LECTURE")
export const FETCH_ALL_LECTURES = createAsyncActionStrings("FETCH_ALL_LECTURES")
export const FETCH_LECTURE = createAsyncActionStrings("FETCH_LECTURE")
export const FETCH_LECTURE_SLIDES = createAsyncActionStrings("FETCH_LECTURE_SLIDES")
