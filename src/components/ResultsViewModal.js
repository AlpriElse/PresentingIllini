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
  Input,
  Table} from 'reactstrap'

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
    if (this.props.polls.length == 0) {
      return <span className="text-center">No polls have been created.</span>
    }
    if (this.state.selectedPoll == "select") {
      return <span className="text-center">Please select a poll to view.</span>
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

    let totalResponses = 0
    for (let num of counts) {
      totalResponses += num
    }

    return (
      <Table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Number of Responses</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>{counts[0]}</td>
            <td>{Math.round(counts[0]/totalResponses * 100) }%</td>
          </tr>
          <tr>
            <td>B</td>
            <td>{counts[1]}</td>
            <td>{Math.round(counts[1]/totalResponses * 100) }%</td>
          </tr>
          <tr>
            <td>C</td>
            <td>{counts[2]}</td>
            <td>{Math.round(counts[2]/totalResponses * 100) }%</td>
          </tr>
          <tr>
            <td>D</td>
            <td>{counts[3]}</td>
            <td>{Math.round(counts[3]/totalResponses * 100) }%</td>
          </tr>

        </tbody>
      </Table>
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

ResultsViewModal.defaultProps = {
  polls: [],
  submissions: []
}

ResultsViewModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  polls: PropTypes.array,
  isopen: PropTypes.bool.isRequired,
  submissions: PropTypes.array
}
