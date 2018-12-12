const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
// const { createCourse, fetchAllCourses, fetchCourse } = require('../firebase/firestore')


router.get('/course/:course_id/lecture_info/:lecture_id', (req, res) => {
  let courses = getJSON('../../temp/data.json')
  let requested_course = {}
  for (let course of courses) {
    console.log(course.course_id)
    if (course.course_id == req.params.course_id) {
      requested_course = course
      break
    }
  }
  let requested_lecture = {}
  for (let lecture of lectures) {
    if (lecture.lecture_id == req.params.lecture_id) {
      requested_lecture = lecture
    }
  }
  res.json(reqeusted_lecture)
})

router.post('/createCourse', (req, res) => {
  console.log("Called")
  console.log(req.body)
  createCourse({
    course_title: req.body.course_title,
    course_description: req.body.course_description
  })
  res.json({message: "Success"})
})

router.get('/givePDF', (req, res) => {
  res.sendFile(path.join(__dirname,"../../temp/Lecture_33.pdf"))
})

const getJSON = (filepath) => {
  let contents = fs.readFileSync(path.join(__dirname, "../../temp/data.json"))
  return JSON.parse(contents)
}
module.exports = router
