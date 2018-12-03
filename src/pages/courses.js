import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'

import CourseList from '../containers/CourseList'

const Courses = () => (
  <Page>
    <CourseList/>
  </Page>
)
export default connect()(Courses)
