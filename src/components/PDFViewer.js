import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Lecture } from '../actions/lecture'

import { Document } from 'react-pdf'
import { Page } from 'react-pdf' // Name conflict
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

class PDFViewer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pageNumber: 1,
			numPages: null
		}

	}

	handleKeyDown = (e) => {
		if(e.which == 39) {
			this.props.updatePage(this.state.pageNumber + 1)
			this.setState({
				pageNumber: Math.min(this.state.numPages, this.state.pageNumber + 1)
			})
		} else if (e.which == 37) {
			this.props.updatePage(this.state.pageNumber - 1)
			this.setState({
				pageNumber: Math.max(1, this.state.pageNumber - 1)
			})
		}
	}

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages })
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
PDFViewer.propTypes = {
	fileLink: PropTypes.string.isRequired
}


const mapDispatchToProps = (dispatch) => ({
	updatePage: (page) => {
		dispatch(Lecture.changePage(page))
	}
})

export default connect(null, mapDispatchToProps)(PDFViewer)
