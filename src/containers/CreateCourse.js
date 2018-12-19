import React from 'react'
import { connect } from 'react-redux'
import { addCourse } from '../actions/course'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class CreateCourse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course_title: null,
      course_description: null,
      instructor: null,
      course_instructor_email: null
    }
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(addCourse(this.state, (message) => {
      if (message == "Success") {
        MySwal.fire({
          title: "Successfully Added Course",
          confirmButtonText: "Okay!",
          type: "success",
        }).then(() => {
          window.location.href = "/courses";
        })
      } else if (message == "Error") {
        MySwal.fire({
          title: "Error when Added Course",
          type: "error",
          confirmButtonText: "Retry submission."

        })
      }
    }))
  }

  render() {
    return (
      <div className="container-fluid">
        <br />
        <h2 className="text-center">Create Course</h2>
        <br />
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="course_title">Course Title</label>
            <input type="text" className="form-control" id="course_title"
              placeholder="Course Title"
              onChange={this.handleFormChange}/>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="course_description">Course Description</label>
            <textarea className="form-control" id="course_description"
              placeholder="Course Description"
              onChange={this.handleFormChange}/>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="instructor">Instructor Name</label>
            <input type="text" className="form-control" id="instructor"
              placeholder="Instructor Name"
              onChange={this.handleFormChange}/>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="instructor_email">Instructor Email Address</label>
            <input type="email" className="form-control" id="instructor_email"
              placeholder="Instructor Email"
              onChange={this.handleFormChange}/>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Create Course</button>
        </form>
      </div>
    )
  }
}

export default connect()(CreateCourse)
