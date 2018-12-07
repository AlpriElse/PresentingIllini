import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'

import LoginPage from '../containers/LoginPage'

class Index extends React.Component {
  render() {
    return (
      <Page>
        <LoginPage />
      </Page>
    )
  }
}

export default connect()(Index)
