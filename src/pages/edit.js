import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'

import CreateCourse from '../containers/CreateCourse'

class Edit extends React.Component {
  constructor(props) {
    super(props)

  }
  static async getInitialProps ({query}) {
    return ({
      page: query.page
    })
  }
  render() {
    let editor;
    switch (this.props.page) {
      case "createCourse":
        editor = <CreateCourse/>
        break;
      default:
        editor = <h1>Error</h1>
        break;
    }
    return (
      <Page>
        {editor}
      </Page>
    )
  }
}

export default connect()(Edit)
