import React from 'react'
import PropTypes from 'prop-types'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

class PollViewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [false, false, false, false]
    }
  }

  onClickHandler = (i) => {
    this.setState((state) => {
      let new_selected = state.selected
      new_selected[i] = !state.selected[i]
      return ({
        selected: new_selected
      })
    })
  }

  render() {
    
    return (
      <div>
      <Modal isOpen={this.props.isopen}>
      <ModalHeader toggle={this.props.toggle}>Class Poll</ModalHeader>
      <ModalBody>
        <Button block color={this.state.selected[0] ? "success" : "secondary"} size="lg"
          onClick={() => { this.onClickHandler(0)}}>A</Button>
        <Button block color={this.state.selected[1] ? "success" : "secondary"} size="lg"
          onClick={() => { this.onClickHandler(1)}}>B</Button>
        <Button block color={this.state.selected[2] ? "success" : "secondary"} size="lg"
          onClick={() => { this.onClickHandler(2)}}>C</Button>
        <Button block color={this.state.selected[3] ? "success" : "secondary"} size="lg"
          onClick={() => { this.onClickHandler(3)}}>D</Button>
      </ModalBody>
      <ModalFooter>
      <Button color="primary" onClick={() => (this.props.confirm(this.state.selected))}>Submit Answers</Button>{' '}
      <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
      </ModalFooter>
      </Modal>
      </div>

    )
  }
}

export default PollViewModal


PollViewModal.propTypes = {
  isopen: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired
}
