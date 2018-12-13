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
      this.props.courses.map((e) => {
        return (
          <CourseInfoCard
            course_title={e.course_title}
            course_description={e.course_description}
            instructor={e.instructor}
            course_id={e.course_id}/>
        )
      })
    )
  }

  renderLectureList() {
    if (this.props.lectures == undefined || this.props.lectures.length == 0) {
      return (
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">No lectures available.</h5>
              <p className="card-text">This may be a mistake, contact your instructor.</p>
            </div>
          </div>
        </div>
      )
    }
    return (
      this.props.lectures.map((e) => {
        let date = Moment(e.date).format("MMMM, Do YYYY")
        let link = "/course/" + this.props.course_id + "/lecture/"
          + e.id;

        return (
          <LectureInfoCard
            date={date}
            lecture_title={e.title}
            lecture_description={e.description}
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
