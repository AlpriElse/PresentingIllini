import React from 'react'
import PropTypes from 'prop-types'
import uniqueString from 'unique-string'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap'

export default class CreatePollViewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      prompt: "",
      type: "",
      id: "",
      submissions: []
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSend = () => {
    this.state.id = uniqueString().slice(0, 5)
    this.props.toggle()
    this.props.send(Object.assign({}, this.state))

    //  Reset
    this.setState({
      title: "",
      prompt: "",
      type: "",
      id: "",
      submissions: []
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader toggle={this.props.toggle}>Create Poll</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Poll Title</Label>
                <Input type="text" name="title" id="title"
                  placeholder="ex: Comprehension Check 01"
                  onChange={this.handleChange}
                  value={this.state.title}/>
              </FormGroup>
              <FormGroup>
                <Label for="prompt">Prompt Text (optional)</Label>
                <Input type="text" name="prompt" id="prompt"
                  onChange={this.handleChange}
                  value={this.state.prompt}/>
              </FormGroup>
              <FormGroup>
                <Label for="type">Poll Type</Label>
                <Input type="select" name="type" id="type"
                  onChange={this.handleChange}
                  value={this.state.type}>
                  <option value="">Select</option>
                  <option value="multipleChoice">Multiple Choice</option>
                  <option value="freeResponse">Free Response</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSend}>Send</Button>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

CreatePollViewModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  send: PropTypes.func.isRequired
}
