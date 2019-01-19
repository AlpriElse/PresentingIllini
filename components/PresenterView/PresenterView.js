import React from 'react'
import PropTypes from 'prop-types'

import PresenterToolbar from './PresenterToolbar'
import ResultsViewModal from './ResultsViewModal'
import QuestionsViewModal from '../QuestionsViewModal'
import CreatePollViewModal from './CreatePollViewModal'
import ExportViewModal from './ExportViewModal'

import { instructorSocket } from '../../sockets/client-instructor'

const Style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
class PresenterView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: {
        questionsViewModal: false,
        resultsViewModal: false,
        createPollViewModal: false,
        exportViewModal: false
      },
      polls: [],
      questions : [],
      slideChanges: {}
    }
  }

  componentDidMount() {
    instructorSocket.connect(this.props.lecture_id)

    instructorSocket.subscribe.question((question) => {
      this.setState(state => ({
        questions: state.questions.concat(question)
      }))
    })

    instructorSocket.subscribe.slideChange(change => {
      this.setState(state =>  {
        if (state.slideChanges[change.user]) {
          state.slideChanges[change.user].push(change.slide_number)
        } else {
          state.slideChanges[change.user] = [change.slide_number]
        }
        return state
      })
    })

    instructorSocket.subscribe.pollSubmission(submission => {
      this.setState(state => {
        let index = this.state.polls.findIndex(poll => {
          return poll.id == submission.poll_id
        })
        delete submission.poll_id
        state.polls[index].submissions.push(submission)
        return state
      })
    })
  }

  sendPoll = (poll) => {
    instructorSocket.send.poll(this.props.lecture_id, poll)
    this.setState(state => ({
      polls: state.polls.concat(poll)
    }))
  }

  toggleModal = (modal) => {
    this.setState(state => {
      state.show[modal] = !state.show[modal]
      return state
    })
  }

  render() {
    return (
      <div>
        <ResultsViewModal
          isOpen={this.state.show.resultsViewModal}
          toggle={() => (this.toggleModal("resultsViewModal"))}
          polls={this.state.polls}/>
        <QuestionsViewModal
          isOpen={this.state.show.questionsViewModal}
          toggle={() => (this.toggleModal("questionsViewModal"))}
          questions={this.state.questions} />
        <CreatePollViewModal
          isOpen={this.state.show.createPollViewModal}
          toggle={() => (this.toggleModal("createPollViewModal"))}
          send={this.sendPoll} />
        <ExportViewModal
          isOpen={this.state.show.exportViewModal}
          toggle={() => (this.toggleModal("exportViewModal"))}
          polls={this.state.polls}
          questions={this.state.questions}
          slideChanges={this.state.slideChanges}/>

        <PresenterToolbar
          toggleModal={this.toggleModal}/>
        <br />
        <div style={Style}>
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}
export default PresenterView


PresenterView.propTypes = {
  lecture_id: PropTypes.string.isRequired
}
