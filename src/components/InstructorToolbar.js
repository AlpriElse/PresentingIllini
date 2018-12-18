import React from 'react'
import PropTypes from 'prop-types'

import ResultsViewModal from './ResultsViewModal'
import QuestionsViewModal from './QuestionsViewModal'
import CreatePollViewModal from './CreatePollViewModal'

import { instructorSocket } from '../sockets/client-instructor'

class InstructorToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showResultsViewModal: false,
      pollSubmissions: [],
      polls: [],
      showQuestionsViewModal: false,
      questions : [],
      showCreatePollViewModal: false,
      slideChanges: []
    }
  }

  componentDidMount() {
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
    instructorSocket.subscribe.pollSubmission(submission => {
      this.setState(state => ({
        pollSubmissions: state.pollSubmissions.concat(submission)
      }))
    })
  }

  sendPoll = (poll) => {
    instructorSocket.send.poll(this.props.lecture_id, poll)
    this.setState(state => ({
      polls: state.polls.concat(poll)
    }))
  }

  toggleCreatePollViewModal = () => {
    this.setState(state => ({
      showCreatePollViewModal: !state.showCreatePollViewModal
    }))
  }

  toggleResultsViewModal = () => {
    this.setState(state => ({
      showResultsViewModal: !state.showResultsViewModal
    }))
  }

  toggleQuestionsViewModal = () => {
    this.setState(state => ({
      showQuestionsViewModal: !state.showQuestionsViewModal
    }))
  }

  toggleExportDataViewModal = () => {

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
          isOpen={this.state.showResultsViewModal}
          toggle={this.toggleResultsViewModal}
          polls={this.state.polls}
          submissions={this.state.pollSubmissions}/>
        <QuestionsViewModal
          isOpen={this.state.showQuestionsViewModal}
          toggle={this.toggleQuestionsViewModal}
          questions={this.state.questions} />
        <CreatePollViewModal
          isOpen={this.state.showCreatePollViewModal}
          toggle={this.toggleCreatePollViewModal}
          send={this.sendPoll} />

        <li className="nav-item dropdown">
          <span className="nav-link" role="button"
            onClick={this.toggleQuestionsViewModal}>
          Questions {
            this.state.questions.length > 0 &&
              <span className="badge badge-pill badge-danger">{this.state.questions.length}</span>
          }
          </span>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button"
            onClick={this.toggleCreatePollViewModal}>Create Poll</span>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button"
            onClick={this.toggleResultsViewModal}>Show Results</span>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button"
            onClick={this.toggleExportDataViewModal}>Export Data</span>
        </li>
      </ul>
    )
  }
}
export default InstructorToolbar


InstructorToolbar.propTypes = {
  lecture_id: PropTypes.string.isRequired
}
