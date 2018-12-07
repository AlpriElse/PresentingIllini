import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'
import CreateCourse from '../containers/CreateCourse'

class Testing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <Page>
        <CreateCourse/ >
      </Page>
    )
  }
}



export default connect()(Testing)
