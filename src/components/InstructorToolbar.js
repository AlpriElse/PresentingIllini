import React from 'react'
import PropTypes from 'prop-types'
import uniqueString from 'unique-string'

import { instructorSocket } from '../sockets/client-instructor'
import ResultsViewModal from './ResultsViewModal'
import QuestionsViewModal from './QuestionsViewModal'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class InstructorToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showResultsViewModal: false,
      pollSubmissions: [],
      polls: [],
      showQuestionsViewModal: false,
      questions : [],
      slideChanges: []
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
        instructorSocket.send.poll(this.props.lecture_id,newPollID)
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

  toggleQuestionsViewModal = () => {
    this.setState(state => ({
      showQuestionsViewModal: !state.showQuestionsViewModal
    }))
  }

  handleShowQuestions = () => {
    this.toggleQuestionsViewModal()
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
        <QuestionsViewModal
          isopen={this.state.showQuestionsViewModal}
          toggle={this.toggleQuestionsViewModal}
          questions={this.state.questions} />

        <li className="nav-item dropdown">
          <span className="nav-link" role="button" onClick={this.handleShowQuestions}>
          Questions {
            this.state.questions.length > 0 &&
              <span className="badge badge-pill badge-danger">{this.state.questions.length}</span>
          }
          </span>

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
