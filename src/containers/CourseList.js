import React from 'react'
import { connect } from 'react-redux'
import InfoCardList from '../components/InfoCardList'
import Loading from '../components/Loading'
import AddCourseInfoCard from '../components/AddCourseInfoCard'
import { fetchAllCourses } from '../actions/course.js'

class CourseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      isLoading: true
    }

    this.updateCourseList = this.updateCourseList.bind(this)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchAllCourses(this.updateCourseList))
  }

  updateCourseList(status, courses) {
    console.log(courses)
    if (status == "Success") {
      this.setState({
        courses: courses
      })
    }
    this.setState({
      isLoading: false
    })

  }

  render() {
    let Content = this.state.isLoading ? <Loading /> :
      <InfoCardList type="courses"
        courses={this.state.courses}/>

    return (
      <div className="container">
        <br />
        <h2>Courses</h2>
        <div className="row">
          {
            Content
          }
          {
            !this.state.isLoading && <AddCourseInfoCard />
          }
        </div>
      </div>
    )
  }
}

export default connect()(CourseList)
