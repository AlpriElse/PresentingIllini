import React from 'react'
import { connect } from 'react-redux'
import InfoCardList from '../components/InfoCardList'
import Loading from '../components/Loading'
import { fetchCourse } from '../actions/course'
import { Lecture } from '../actions/lecture'
import AddLectureInfoCard from '../components/AddLectureInfoCard'

const Style = {
  margin: '5px 0'
}

class CourseInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCourse(this.props.course_id)
    this.props.loadLectures(this.props.course_id)
  }

  render() {
    console.log(this.props.lectures)
    let course = this.props.course
    let course_info = this.props.course.items
    let lectures = this.props.lectures
    let isLoading = (course.isFetching || course.invalid) ||
      lectures.isFetching || lectures.invalid
    let Content = (
      !isLoading ?
      <div>
        <h2>{course_info.course_title}</h2>
        <p>{course_info.course_description}</p>
        <div>
          <h4>Lectures</h4>
          <div className="row">
            <InfoCardList type="lectures"
              lectures={lectures.items}
              course_id={course_info.course_id}/>
            {
              !(course_info == undefined) &&
                <AddLectureInfoCard course_title={course_info.course_title}
                course_id={course_info.course_id}/>
            }
          </div>
        </div>
      </div> : <Loading />
    )
    return (
      <div className="container">
        { Content }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    course: state.course,
    lectures: state.lectures
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCourse: (course_id) => {
      dispatch(fetchCourse(course_id))
    },
    loadLectures: (course_id) => {
      dispatch(Lecture.fetchAll(course_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)
