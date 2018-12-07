import React from 'react'
import { Document } from 'react-pdf'
import { Page } from 'react-pdf' // Name conflict
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class PDFViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 1,
      numPages: null
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this)
  }

  handleKeyDown(e) {
    if(e.which == 39) {
      this.setState({
        pageNumber: Math.min(this.state.numPages, this.state.pageNumber + 1)
      })
    } else if (e.which == 37) {
      this.setState({
        pageNumber: Math.max(1, this.state.pageNumber - 1)
      })
    }
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    return (
      <div onKeyDown={this.handleKeyDown} tabIndex="0">
        <Document file={this.props.fileLink}
            onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={this.state.pageNumber}/>
        </Document>
      </div>
    )
  }

}
