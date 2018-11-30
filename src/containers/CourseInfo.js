import React from 'react'
import InfoCardList from '../components/InfoCardList'
import Loading from '../components/Loading'

const Style = {
  margin: '5px 0'
}
//  Implement with firebase when ready
let fetchCourseInfo = (course_id, callback) => {
  //  Should use course_id to fetch data
  fetch('/api/temp_course_info.json')
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {
      callback(myJson)
    })
}

export default class CourseInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course_info: {}
    }

    this.updateCourseInfo = this.updateCourseInfo.bind(this)
  }

  componentDidMount() {
    fetchCourseInfo(this.props.course_id, this.updateCourseInfo)
  }

  updateCourseInfo(course_info) {
    this.setState({
      course_info: course_info
    })
  }


  render() {
    let CourseInfo = (
      this.state.course_info.course_name ?
      <div>
        <h2>{this.state.course_info.course_name}</h2>
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
        { CourseInfo }
      </div>
    )
  }
}
