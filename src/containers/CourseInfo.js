import React from 'react'
import { connect } from 'react-redux'
import InfoCardList from '../components/InfoCardList'
import Loading from '../components/Loading'
import { fetchCourse } from '../actions/course'

const Style = {
  margin: '5px 0'
}

class CourseInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course_info: {},
      isLoading: true
    }

    this.updateCourseInfo = this.updateCourseInfo.bind(this)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchCourse(this.props.course_id, this.updateCourseInfo))
  }

  updateCourseInfo(status, course_info) {
    console.log("callback called")
    if (status == "Success") {
      this.setState({
        course_info: course_info
      })
    }
    this.setState({
      isLoading: false
    })

  }


  render() {
    let Content = (
      !this.state.isLoading ?
      <div>
        <h2>{this.state.course_info.course_title}</h2>
        <p>{this.state.course_info.course_description}</p>
        <div>
          <h4>Lectures</h4>
          <div className="row">
          {
            <InfoCardList type="lectures"
              data={this.state.course_info}/>
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

export default connect()(CourseInfo)
