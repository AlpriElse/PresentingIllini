import React from 'react'
import PropTypes from 'prop-types'

class PresenterToolbar extends React.Component {
  constructor(props) {
    super(props)

  }
  // {
  //   this.state.questions.length > 0 &&
  //     <span className="badge badge-pill badge-danger">{this.state.questions.length}</span>
  // }
  render() {
    const toggleModal = this.props.toggleModal
    return (
      <ul className="nav nav-pills">
        <li className="nav-item dropdown">
          <span className="nav-link" role="button"
            onClick={() => (toggleModal("questionsViewModal"))}>
          Questions
          </span>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button"
            onClick={() => (toggleModal("createPollViewModal"))}>Create Poll</span>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button"
            onClick={() => (toggleModal("resultsViewModal"))}>Show Results</span>
        </li>
        <li className="nav-item">
          <span className="nav-link" role="button"
            onClick={() => (toggleModal("exportViewModal"))}>Export Data</span>
        </li>
      </ul>
    )
  }
}
export default PresenterToolbar


PresenterToolbar.propTypes = {
  toggleModal: PropTypes.func.isRequired
}
