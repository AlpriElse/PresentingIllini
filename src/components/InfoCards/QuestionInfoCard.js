import React from 'react'
import PropTypes from 'prop-types'

import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText } from 'reactstrap'

const Style = {
  margin: '15px 0'
}

export const QuestionInfoCard = (props) => {
  let user = props.question.user == "" ? "Anonymous" : props.questions.user
  return (
    <Col md="12">
      <Card style={Style}>
        <CardBody>
          <CardTitle>{user}</CardTitle>
          <CardText>{props.question.body}</CardText>
        </CardBody>
      </Card>
    </Col>
  )
}

QuestionInfoCard.defaultProps = {
  question: {
    user: "Anonymous"
  }
}

QuestionInfoCard.propTypes = {
  question: PropTypes.shape({
    user: PropTypes.string,
    body: PropTypes.string.isRequired
  })
}
