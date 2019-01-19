import React from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input } from 'reactstrap'

class PollViewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      selected: []
    }
  }

  isSelected = (option) => {
    return this.state.selected.indexOf(option) != -1
  }

  handleClick = (option) => {
    let index = this.state.selected.indexOf(option)
    this.setState(state => {
      if (index == -1) {
        return {
          selected: state.selected.concat(option)
        }
      } else {
        state.selected.splice(index, 1)
        return {
          selected: state.selected
        }
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit = () => {
     if (this.props.poll.type == "multipleChoice") {
       this.props.confirm(this.state.selected)
     } else {
       this.props.confirm(this.state.text)
     }

     // Reset
     this.setState({
       selected: [],
       text: ""
     })
  }

  renderMultipleChoice = () => (
    <div>
      <Button block name="A" color={this.isSelected('A') ? "success" : "secondary"} size="lg"
        onClick={() => (this.handleClick('A'))}>A</Button>
      <Button block name="B" color={this.isSelected('B') ? "success" : "secondary"} size="lg"
        onClick={() => (this.handleClick('B'))}>B</Button>
      <Button block name="C" color={this.isSelected('C') ? "success" : "secondary"} size="lg"
        onClick={() => (this.handleClick('C'))}>C</Button>
      <Button block name="D" color={this.isSelected('D') ? "success" : "secondary"} size="lg"
        onClick={() => (this.handleClick('D'))}>D</Button>
    </div>
  )

  renderFreeResponse = () => (
    <div>
      <Input type="text" value={this.state.value} name="text" id="text"
        onChange={this.handleChange}/>
    </div>
  )

  render() {
    const poll = this.props.poll
    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader toggle={this.props.toggle}>{poll.title}</ModalHeader>
          <ModalBody>
            <p>{poll.prompt}</p>
            {
              poll.type == "multipleChoice" ? this.renderMultipleChoice() :
                this.renderFreeResponse()
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Submit Answers</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

    )
  }
}

export default PollViewModal

PollViewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  poll: PropTypes.object.isRequired
}
