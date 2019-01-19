import React from 'react'
import { connect } from 'react-redux'
import { Lecture } from '../actions/lecture'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class AddLecture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      description: null
    }
    this.fileInput = React.createRef()
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addLecture({
      course_id: this.props.course_id,
      title: this.state.title,
      description: this.state.description,
      slides: this.fileInput.current.files[0]
    }, (message) => {
      if (message == "Success") {
        MySwal.fire({
          title: "Successfully Added Lecture",
          confirmButtonText: "Okay!",
          type: "success",
        }).then(() => {
          window.location.href = "/course/" + this.props.course_id;
        })
      } else if (message == "Error") {
        MySwal.fire({
          title: "Error when adding lecture...",
          type: "error",
          confirmButtonText: "Retry submission."

        })
      }
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <br />
        <h2 className="text-center">Add Lecture</h2>
        <br />
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only" htmlFor="title">Lecture Title</label>
            <input type="text" className="form-control" id="title"
              placeholder="Lecture Title"
              onChange={this.handleFormChange}/>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="ldescription">Lecture Description</label>
            <textarea className="form-control" id="description"
              placeholder="Lecture Description"
              onChange={this.handleFormChange}/>
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="slides">Lecture Slides Upload</label>
            <input type="file" id="slides"
              ref={this.fileInput}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addLecture: (lecture, cb) => {
      dispatch(Lecture.add(lecture, cb))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddLecture)
