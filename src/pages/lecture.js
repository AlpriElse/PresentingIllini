import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Layout from '../components/Layout'
import LectureView from '../containers/LectureView'

const Lecture = () => (
  <div>
    <Header />
    <Layout>
      <LectureView />
    </Layout>
  </div>
)

export default connect()(Lecture)
