import React from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input } from 'reactstrap'

export default class ResultsViewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPoll: "select"
    }
  }

  handleChange = (e) => {
    this.setState({
      selectedPoll: e.target.value
    })
    console.log(e)
  }

  renderResults = () => {
    if (this.state.selectedPoll == "select") {
      return <span>Please select a poll to view</span>
    }
    let filteredSubmissions = this.props.submissions.filter((submission) => {
      if (this.state.selectedPoll == submission.pollId) {
        return true
      }
      return false
    })

    let counts = [0, 0, 0, 0]
    filteredSubmissions.forEach((submission) => {
      for (let i = 0; i < 4; i++) {
        if (submission.submission[i]) {
          counts[i] += 1
        }
      }
    })

    return (
      <div>
        <span>A: {counts[0]}</span><br/>
        <span>B: {counts[1]}</span><br/>
        <span>C: {counts[2]}</span><br/>
        <span>D: {counts[3]}</span><br/>
      </div>
    )

  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isopen}>
          <ModalHeader toggle={this.props.toggle}>Results</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Select a poll</Label>
              <Input type="select"
                value={this.state.selectedPoll}
                onChange={this.handleChange}>
                <option value="select">Select</option>
                {
                  this.props.polls.map((pollID) => (
                    <option value={pollID}>{pollID}</option>
                  ))
                }
              </Input>
            </FormGroup>
            {
              this.renderResults()
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
