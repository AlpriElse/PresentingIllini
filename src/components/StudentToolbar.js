import React from 'react'
import PropTypes from 'prop-types'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import PollViewModal from '../components/PollViewModal'

import { studentSocket } from '../sockets/client-student'

class StudentToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPollViewModal: false
    }
    //  TODO: Replace with actual lecture_id
    studentSocket.connect(this.props.lecture_id)
    studentSocket.subscribe.poll((poll) => {
      console.log("RECIEVED")
      this.togglePollViewModal()
    })

  }

  togglePollViewModal = () => {
    this.setState(state => ({
      showPollViewModal: !state.showPollViewModal
    }))
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
        studentSocket.create.question(this.props.lecture_id, data.value)
      }
    })
  }

  handlePollSubmit = () => {

  }

  render() {
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

export default StudentToolbar

StudentToolbar.propTypes = {
  lecture_id: PropTypes.string.isRequired
}
