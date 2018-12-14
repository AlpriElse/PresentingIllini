import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import { studentSocket } from '../sockets/client-student'

class StudentToolbar extends React.Component {
  constructor(props) {
    super(props)

    //  TODO: Replace with actual lecture_id
    studentSocket.connect(this.props.lecture_id)
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
        studentSocket.askQuestion(this.props.lecture_id, data.value)
      }
    })
  }

  render() {
    return (
      <div>
        <nav className="nav text-primary nav-pills nav-fill">
          <span onClick={this.askQuestionHandler} className="nav-item nav-link" >Ask a Question</span>
        </nav>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  lecture_id: state.lecture.items.lecture_id
})
export default connect(mapStateToProps, null)(StudentToolbar)
