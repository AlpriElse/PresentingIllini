import React from 'react'
import { connect } from 'react-redux'
import { addLecture } from '../actions/lecture'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class AddLecture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFormChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(e) {
    const {dispatch} = this.props
    dispatch(addLecture(this.state, this.createCallback))
    e.preventDefault()
  }

  createCallback(message) {
    // if (message == "Success") {
    //   MySwal.fire({
    //     title: "Successfully Added Lecture",
    //     confirmButtonText: "Okay!",
    //     type: "success",
    //   }).then(() => {
    //     window.location.href = "http://localhost:3000/courses";
    //   })
    // } else if (message == "Error") {
    //   MySwal.fire({
    //     title: "Error when Added Course",
    //     type: "error",
    //     confirmButtonText: "Retry submission."
    //
    //   })
    // }
  }

  render() {
    return (
      <div className="container-fluid">
        <br />
        <h2 className="text-center">Add Lecture</h2>
        <br />
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="lecture_title">Lecture Title</label>
            <input type="text" className="form-control" id="lecture_title"
              placeholder="Lecture Title"
              onChange={this.handleFormChange}/>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="lecture_description">Lecture Description</label>
            <textarea className="form-control" id="courese_description"
              placeholder="Lecture Description"
              onChange={this.handleFormChange}/>
          </div>
        </form>
      </div>
    )
  }
}

export default connect()(AddLecture)
