import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'

import CreateCourse from '../containers/CreateCourse'
import AddLecture from '../containers/AddLecture'

class Edit extends React.Component {
  constructor(props) {
    super(props)

  }
  static async getInitialProps ({query}) {
    return ({
      page: query.page,
      course_id: query.course_id
    })
  }
  render() {
    let editor;
    switch (this.props.page) {
      case "createCourse":
        editor = <CreateCourse/>
        break;
      case "addLecture":
        editor = <AddLecture/>
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
