import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import PollViewModal from './PollViewModal'
import QuestionsViewModal from './QuestionsViewModal'

import { studentSocket } from '../sockets/client-student'

class StudentToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showQuestionsViewModal: false,
      questions: [],
      showPollViewModal: false,
      pageNumber: null,
      currentPoll: {}
    }
  }

  componentDidMount() {
    studentSocket.connect(this.props.lecture_id)

    studentSocket.subscribe.poll((poll) => {
      this.setState(state => ({
        showPollViewModal: !state.showPollViewModal,
        currentPoll: poll
      }))
    })

    studentSocket.subscribe.question((question) => {
      this.setState(state => ({
        questions: state.questions.concat(question)
      }))
    })
  }

  componentWillReceiveProps() {
    if (this.state.pageNumber != this.props.pageNumber) {
      studentSocket.send.slideChange(this.props.lecture_id, this.props.pageNumber, this.props.user)
      this.setState({
        pageNumber: this.props.pageNumber
      })
    }
  }

  handleAskQuestion = () => {
    Swal({
      title: 'What\'s your question?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((data) => {
      if (data.value != undefined) {
        studentSocket.send.question(this.props.lecture_id, {
          user: this.props.user,
          body: data.value
        })
      }
    })
  }

  toggleQuestionsViewModal = () => {
    this.setState(state => ({
      showQuestionsViewModal: !state.showQuestionsViewModal
    }))
  }
  togglePollViewModal = () => {
    this.setState(state => ({
      showPollViewModal: !state.showPollViewModal
    }))
  }

  handlePollSubmit = (answer) => {
    this.togglePollViewModal()
    studentSocket.send.pollSubmission(
      this.props.lecture_id,
      this.props.user,
      this.state.currentPoll.id,
      answer
    )
  }

  render() {
    return (
      <div>
        <QuestionsViewModal
          isOpen={this.state.showQuestionsViewModal}
          toggle={this.toggleQuestionsViewModal}
          questions={this.state.questions} />
        <PollViewModal
          isOpen={this.state.showPollViewModal}
          confirm={this.handlePollSubmit}
          toggle={this.togglePollViewModal}
          poll={this.state.currentPoll} />

        <nav className="nav nav-pills nav-fill">
          <span onClick={this.handleAskQuestion} className="nav-item nav-link" >Ask a Question</span>
          <span onClick={this.toggleQuestionsViewModal} className="nav-item nav-link">Student Questions</span>
        </nav>
      </div>
    )
  }
}

StudentToolbar.propTypes = {
  lecture_id: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  pageNumber: state.pageNumber
})

export default connect(mapStateToProps, null)(StudentToolbar)
