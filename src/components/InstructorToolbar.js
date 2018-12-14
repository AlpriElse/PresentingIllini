import React from 'react'
import { instructorSocket } from '../sockets/client-instructor'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class InstructorToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions : []
    }

    //  TODO: Replace with actual lecture_id
    instructorSocket.connect(this.props.lecture_id)

    instructorSocket.subscribe.question((question) => {
      this.setState(state => ({
        questions: state.questions.concat(question)
      }))
    })
  }

  createPoll = () => {
    Swal({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((data) => {
      if (data.value) {
        instructorSocket.create.poll({})
      }
    })
  }

  render() {
    let questionsList = <span className="dropdown-item text-primary">No Questions</span>
    if (this.state.questions.length > 0) {
      questionsList = this.state.questions.map((question) => (
        <span className="dropdown-item text-primary">{question}</span>
      ))
    }

    return (
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          Questions {
            this.state.questions.length > 0 &&
              <span className="badge badge-pill badge-danger">{this.state.questions.length}</span>
          }
          </span>
          <div className="dropdown-menu">
            {
              questionsList
            }
          </div>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button" onClick={this.createPoll}>Create Poll</span>
        </li>
      </ul>
    )
  }
}
export default InstructorToolbar
