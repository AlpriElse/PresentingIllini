import React from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Table,
  Card,
  CardTitle,
  CardText,
  CardBody } from 'reactstrap'

import { Pie as PieChart} from 'react-chartjs'

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
  }

  renderResults = () => {
    if (this.props.polls.length == 0) {
      return <span className="text-center">No polls have been created.</span>
    }
    if (this.state.selectedPoll == "select") {
      return <span className="text-center">Please select a poll to view.</span>
    }

    let poll = this.props.polls.find((poll) => {
      return poll.id == this.state.selectedPoll
    })

    let filteredSubmissions = poll.submissions

    if (poll.type == "multipleChoice") {
      let counts = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0
      }
      filteredSubmissions.forEach(submission => {
        submission.answer.forEach(option => {
          counts[option] += 1
        })
      })

      let totalResponses = counts['A'] + counts['B'] + counts['C'] + counts['D']

      let chartData = [
        {
          value: counts['A'],
          label: 'A',
          color :"#19BCFF"
        },
        {
          value: counts['B'],
          label: 'B',
          color: "#F74A55"
        },
        {
          value: counts['C'],
          label: 'C',
          color: "#F28453"
        },
        {
          value: counts['D'],
          label: 'D',
          color: "#BAFAA6"
        }
      ]

      let chartOptions = {
        animateRotate: false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"
      }

      return (
        <Row>
          <Col md="6">
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
                  <td>{counts['A']}</td>
                  <td>{Math.round(counts['A']/totalResponses * 100) }%</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>{counts['B']}</td>
                  <td>{Math.round(counts['B']/totalResponses * 100) }%</td>
                </tr>
                <tr>
                  <td>C</td>
                  <td>{counts['C']}</td>
                  <td>{Math.round(counts['C']/totalResponses * 100) }%</td>
                </tr>
                <tr>
                  <td>D</td>
                  <td>{counts['D']}</td>
                  <td>{Math.round(counts['D']/totalResponses * 100) }%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="6">
            <PieChart data={chartData} options={chartOptions}/>
          </Col>
        </Row>
      )
    } else {
      return (
        <div>
        {
          filteredSubmissions.map(submission => (
            <Card>
              <CardBody>
                <CardTitle>{submission.user == "" ? "Anonymous" : submission.user}</CardTitle>
                <CardText>{submission.answer}</CardText>
              </CardBody>
            </Card>
          ))
        }
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} size="lg">
          <ModalHeader toggle={this.props.toggle}>Results</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Select a poll</Label>
              <Input type="select"
                value={this.state.selectedPoll}
                onChange={this.handleChange}>
                <option value="select">Select</option>
                {
                  this.props.polls.map((poll) => (
                    <option value={poll.id}>{poll.title}</option>
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
  isOpen: PropTypes.bool.isRequired,
  submissions: PropTypes.array
}
