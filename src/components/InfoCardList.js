import React from 'react'
import Moment from 'moment'
import CourseInfoCard from './CourseInfoCard'
import LectureInfoCard from './LectureInfoCard'

export default class InfoCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderCourseList() {
    return (
      this.props.data.map((e) => {
        return (
          <CourseInfoCard
            course_name={e.course_name}
            course_description={e.course_description}
            instructor={e.instructor}
            course_id={e.course_id}/>
        )
      })
    )
  }

  renderLectureList() {
    console.log("data:",this.props.data)
    return (
      this.props.data.lectures.map((e) => {
        let date = Moment(e.date).format("MMMM, Do YYYY")
        let link = "/course/" + this.props.course_id + "/lecture/"
          + e.lecture_id;

        return (
          <LectureInfoCard
            date={date}
            lecture_title={e.lecture_title}
            lecture_description={e.lecture_description}
            link={link}/>
        )
      })
    )
  }

  render() {
    switch(this.props.type) {
      case "lectures":
        return this.renderLectureList()
        break
      case "courses":
        return this.renderCourseList()
        break
    }
  }
}
