import React from 'react'
import { connect } from 'react-redux'
import { Lecture as LectureActions } from '../actions/lecture'

import Page from '../containers/Page'
import { Loading } from '../components/Loading'

import PDFViewer from '../components/PDFViewer'
import PresenterView from '../components/PresenterView'
import StudentView from '../components/StudentView'

class Lecture extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pageNumber: 1,
			numPages: null
		}
	}
	static async getInitialProps ({query}) {
		// console.log(query.lec)
		return ({
			course_id: query.course_id,
			lecture_id: query.lecture_id,
			isInstructor: query.instructor != undefined
		})
	}

	componentDidMount() {
		this.props.loadSlides(this.props.lecture_id)
	}
	render() {
		let slides = this.props.slides
		let isLoading = slides.isFetching || slides.invalid
		let View = this.props.isInstructor ? PresenterView : StudentView

		let content = isLoading ? (
			<Loading />
		) : (
			<div>
				<View lecture_id={this.props.lecture_id}>
					<PDFViewer fileLink={this.props.slides.items}/>
				</View>
			</div>
		)


		return (
			<Page>
				<div>
					<br/>
					<div className="justify-content-center">
						{ content }
					</div>
				</div>
			</Page>
		)
	}
}

const mapStateToProps = state => {
	return {
		slides: state.slides
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadSlides: (filename) => {
			dispatch(LectureActions.fetchSlides(filename))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Lecture)
