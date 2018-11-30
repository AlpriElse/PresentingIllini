import React from 'react'
import InfoCardList from '../components/InfoCardList'
import Loading from '../components/Loading'

//  Implement with firebase when ready
let fetchCourses = (callback) => {
  fetch('/api/course/all')
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {
      callback(myJson)
    });
}

export default class CourseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: []
    }

    this.updateCourseList = this.updateCourseList.bind(this)
  }

  componentDidMount() {
    fetchCourses(this.updateCourseList)
  }

  updateCourseList(courses) {
    this.setState({
      courses: courses
    })
  }

  render() {
    let CourseListing = (
      this.state.courses.length > 0 ?
        <InfoCardList type="courses"
          data={this.state.courses}/> : <Loading />
    )

    return (
      <div className="container">
        <br />
        <h2>Courses</h2>
        <div className="row">
        {
          CourseListing
        }
        </div>
      </div>
    )
  }
}
