import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import StudentToolbar from './StudentToolbar'
import PollViewModal from './PollViewModal'
import QuestionsViewModal from '../QuestionsViewModal'

import { studentSocket } from '../../sockets/client-student'

const Style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

class StudentView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: {
        questionsViewModal: false,
        pollViewModal: false
      },
      questions: [],
      pageNumber: null,
      currentPoll: {}
    }
  }

  componentDidMount() {
    studentSocket.connect(this.props.lecture_id)

    studentSocket.subscribe.poll((poll) => {
      this.setState(state => ({
        currentPoll: poll
      }))
      this.toggleModal('pollViewModal')
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

  toggleModal = (modal) => {
    this.setState(state => {
      state.show[modal] = !state.show[modal]
      return state
    })
  }

  handlePollSubmit = (answer) => {
    this.toggleModal('pollViewModal')
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
          isOpen={this.state.show.questionsViewModal}
          toggle={() => (this.toggleModal("questionsViewModal"))}
          questions={this.state.questions} />
        <PollViewModal
          isOpen={this.state.show.pollViewModal}
          confirm={this.handlePollSubmit}
          toggle={() => (this.toggleModal("pollViewModal"))}
          poll={this.state.currentPoll} />
        <StudentToolbar
          toggleModal={this.toggleModal}
          handleAskQuestion={this.handleAskQuestion}/>
        <div style={Style}>
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}

StudentView.propTypes = {
  lecture_id: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  pageNumber: state.pageNumber
})

export default connect(mapStateToProps, null)(StudentView)
