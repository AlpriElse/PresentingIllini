import React from 'react'
import { connect } from 'react-redux'
import { instructorSocket } from '../sockets/client-instructor'
class InstructorToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions : []
    }

    //  TODO: Replace with actual lecture_id
    instructorSocket.connect(this.props.lecture_id)

    instructorSocket.subscribe.recieveQuestion((question) => {
      console.log("Hello")
      this.setState(state => ({
        questions: state.questions.concat(question)
      }))
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
      <ul className="nav nav-pills">
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
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  lecture_id: state.lecture.items.lecture_id
})

export default connect(mapStateToProps, null)(InstructorToolbar)
