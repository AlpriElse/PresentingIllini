import React from 'react'
import PropTypes from 'prop-types'

const Style = {
  margin: '15px 0'
}

export const QuestionInfoCard = (props) => {
  let user = props.question.user == "" ? "Anonymous" : props.questions.user
  return (
    <div className="col-12">
      <div className="card" style={Style}>
        <div className="card-body">
          <h4 className="card-title">{user}</h4>
          <p className="card-text">{props.question.body}</p>
        </div>
      </div>
    </div>
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
