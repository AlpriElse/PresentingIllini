import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'

import LoginPage from '../containers/LoginPage'

import {startClock, serverRenderClock} from '../actions/clock'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    const {dispatch} = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render() {
    return (
      <Page>
        <LoginPage />
      </Page>
    )
  }
}

export default connect()(Index)
