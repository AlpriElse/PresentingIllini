import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'
import PDFViewer from '../components/PDFViewer'
import { Lecture as LectureActions } from '../actions/lecture'
import { Loading } from '../components/Loading'
import StudentToolbar from '../components/StudentToolbar'
import InstructorToolbar from '../components/InstructorToolbar'

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
		let toolbar = this.props.isInstructor ? <InstructorToolbar lecture_id={this.props.lecture_id}/> : <StudentToolbar lecture_id={this.props.lecture_id}/>
		let content = isLoading ? (
			<Loading />
		) : (
			<div>
				{ toolbar }
				<PDFViewer fileLink={this.props.slides.items}/>
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
