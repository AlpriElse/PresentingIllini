import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import PollViewModal from '../components/PollViewModal'

import { studentSocket } from '../sockets/client-student'

class StudentToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPollViewModal: false,
      pageNumber: null,
      currentPoll: null

    }
    studentSocket.connect(this.props.lecture_id)
    studentSocket.subscribe.poll((poll) => {
      this.setState(state => ({
        showPollViewModal: !state.showPollViewModal,
        currentPoll: poll
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

  askQuestionHandler = () => {
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

  togglePollViewModal = () => {
    this.setState(state => ({
      showPollViewModal: !state.showPollViewModal
    }))
  }

  handlePollSubmit = (answers) => {
    this.togglePollViewModal()
    studentSocket.send.pollSubmission(
      this.props.lecture_id,
      this.props.user,
      this.state.currentPoll.pollId,
      answers
    )
  }

  render() {
    console.log("Open", this.state.showPollViewModal)
    return (
      <div>
        <PollViewModal
          isopen={this.state.showPollViewModal}
          confirm={this.handlePollSubmit}
          toggle={this.togglePollViewModal} />
        <nav className="nav text-primary nav-pills nav-fill">
          <span onClick={this.askQuestionHandler} className="nav-item nav-link" >Ask a Question</span>
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
