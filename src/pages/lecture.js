import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'
import { Document } from 'react-pdf'
import { Page as DocumentPage } from 'react-pdf' // Name conflict
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Lecture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 1
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  static async getInitialProps ({query}) {
    return ({
      course_id: query.course_id,
      lecture_id: query.lecture_id
    })
  }

  handleKeyDown(e) {
    console.log(e)
    if(e.which == 39) {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      })
    } else if (e.which == 37) {
      this.setState({
        pageNumber: Math.min(1, this.state.pageNumber - 1)
      })
    }
  }

  render() {
    return (
      <Page>
        <br/>
        <h2>Lecture</h2>
        <div onKeyDown={this.handleKeyDown} tabIndex="0">
          <Document file="http://localhost:3000/api/givePDF">
            <DocumentPage pageNumber={this.state.pageNumber}/>
          </Document>
        </div>
      </Page>
    )
  }
}

export default connect()(Lecture)
