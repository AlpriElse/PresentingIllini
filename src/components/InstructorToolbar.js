import React from 'react'
import PropTypes from 'prop-types'
import uniqueString from 'unique-string'

import { instructorSocket } from '../sockets/client-instructor'
import ResultsViewModal from './ResultsViewModal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class InstructorToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showResultsViewModal: false,
      questions : [],
      slideChanges: [],
      pollSubmissions: [],
      polls: []
    }

    instructorSocket.connect(this.props.lecture_id)

    instructorSocket.subscribe.question((question) => {
      this.setState(state => ({
        questions: state.questions.concat(question)
      }))
    })
    instructorSocket.subscribe.slideChange((data) => {
      this.setState(state => ({
        slideChanges: state.slideChanges.concat(data)
      }))
    })
    instructorSocket.subscribe.pollSubmission((data) => {
      console.log(data)
      this.setState(state => ({
        pollSubmissions: state.pollSubmissions.concat(data)
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
        let newPollID = uniqueString().slice(0, 5)
        instructorSocket.create.poll(this.props.lecture_id,newPollID)
        this.setState(state => ({
          polls: state.polls.concat(newPollID)
        }))
      }
    })
  }
  toggleResultsViewModal = () => {
    this.setState(state => ({
      showResultsViewModal: !state.showResultsViewModal
    }))
  }

  handleShowResults = () => {
    this.toggleResultsViewModal()
  }

  exportData = () => {

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
        <ResultsViewModal
          isopen={this.state.showResultsViewModal}
          toggle={this.toggleResultsViewModal}
          polls={this.state.polls}
          submissions={this.state.pollSubmissions}/>

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
        <li className="nav-item">
          <span className="nav-link" role="button" onClick={this.handleShowResults}>Show Results</span>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button" onClick={this.exportData}>Export Data</span>
        </li>
      </ul>
    )
  }
}
export default InstructorToolbar


InstructorToolbar.propTypes = {
  lecture_id: PropTypes.string.isRequired
}
