import React from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Label } from 'reactstrap'

class ExportViewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectOutput: "select"
    }
  }

  getOutput = (selectOutput) => {
    let outputData = ""

    switch (selectOutput) {
      case "studentQuestions":
        outputData = this.props.questions
        break;
      case "slideChanges":
        outputData = this.props.slideChanges
        break;
      case "pollResponses":
        outputData = this.props.polls
        break;
      default:
        outputData = ""
    }

    return JSON.stringify(outputData, null, 2)
  }

  handleChange = (e) => {
    this.setState({
      selectOutput: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader toggle={this.props.toggle}>Export Data</ModalHeader>
          <ModalBody>
            <Label>Select What To Output</Label>
            <Input type="select"
              value={this.state.selectOutput}
              onChange={this.handleChange}>
              <option value="select">Select</option>
              <option value="slideChanges">Slide Changes</option>
              <option value="pollResponses">Poll Responses</option>
              <option value="studentQuestions">Student Questions</option>
            </Input>
            <Label>Output</Label>
            <Input type="textarea" name="text" rows="12"
              value={this.getOutput(this.state.selectOutput)} readOnly/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Hide</Button>
          </ModalFooter>
        </Modal>
      </div>

    )
  }
}

export default ExportViewModal

ExportViewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  polls: PropTypes.array.isRequired,
  slideChanges: PropTypes.object.isRequired
}
