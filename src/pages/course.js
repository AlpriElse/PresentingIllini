import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'

import CourseInfo from '../containers/CourseInfo'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      course_id: ""
    }
  }
  static async getInitialProps ({query}) {
    return ({
      course_id: query.course_id
    })
  }
  render() {
    return (
      <Page>
          <CourseInfo course_id={this.props.course_id}/>
      </Page>
    )
  }
}

export default connect()(Course)
