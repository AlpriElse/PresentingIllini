import React from 'react'
import PropTypes from 'prop-types'

class StudentToolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <nav className="nav nav-pills nav-fill">
          <span onClick={this.props.handleAskQuestion} className="nav-item nav-link" >Ask a Question</span>
          <span onClick={() => (this.props.toggleModal("questionsViewModal"))} className="nav-item nav-link">Student Questions</span>
        </nav>
      </div>
    )
  }
}

StudentToolbar.propTypes = {
  handleAskQuestion: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default StudentToolbar
