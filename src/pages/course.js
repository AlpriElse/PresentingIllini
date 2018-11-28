import React from 'react'

import Header from '../components/Header'
import Layout from '../components/Layout'
import CourseInfo from '../containers/CourseInfo'

export default class Courses extends React.Component {
  static async getInitialProps({query}) {
    return {
      course_id: query.course_id
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Layout>
          <CourseInfo course_id={this.props.course_id}/>
        </Layout>
      </div>
    )
  }
}
