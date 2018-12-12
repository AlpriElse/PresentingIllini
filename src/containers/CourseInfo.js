import React from 'react'
import { connect } from 'react-redux'
import InfoCardList from '../components/InfoCardList'
import Loading from '../components/Loading'
import { fetchCourse } from '../actions/course'
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
  }

  render() {
    let course = this.props.course
    let course_info = this.props.course.items
    console.log(course)
    let Content = (
      !course.isFetching && !course.invalid ?
      <div>
        <h2>{course_info.course_title}</h2>
        <p>{course_info.course_description}</p>
        <div>
          <h4>Lectures</h4>
          <div className="row">
            <InfoCardList type="lectures"
              data={course_info}/>
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
    course: state.course
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCourse: (course_id) => {
      dispatch(fetchCourse(course_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)
