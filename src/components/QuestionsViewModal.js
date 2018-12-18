import React from 'react'
import PropTypes from 'prop-types'
import { QuestionInfoCard } from './QuestionInfoCard'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'

export default class QuestionsViewModal extends React.Component {
  constructor(props) {
    super(props)
  }
  renderQuestions = () => {
    if (this.props.questions.length == 0) {
      return <span>No questions have been recieved.</span>
    }
    return (
      <div>
        {
          this.props.questions.map(question => (
            <QuestionInfoCard
            question={question}/>
          ))
        }
      </div>
    )
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.isopen}>
          <ModalHeader toggle={this.props.toggle}>Questions</ModalHeader>
          <ModalBody>
            {
              this.renderQuestions()
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Hide</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

QuestionsViewModal.defaultProps = {
  questions: []
}

QuestionsViewModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  questions: PropTypes.array,
  isopen: PropTypes.bool.isRequired
}
