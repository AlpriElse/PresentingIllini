import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'
import PDFViewer from '../components/PDFViewer'

class Lecture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 1,
      numPages: null
    }
  }

  static async getInitialProps ({query}) {
    return ({
      course_id: query.course_id,
      lecture_id: query.lecture_id
    })
  }

  render() {
    return (
      <Page>
        <div>
          <br/>
          <h2>Lecture</h2>
          <div className="justify-content-center">
            <PDFViewer fileLink="http://localhost:3000/api/givePDF"/>
          </div>
        </div>
      </Page>
    )
  }
}

export default connect()(Lecture)
