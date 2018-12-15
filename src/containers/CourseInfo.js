import React from 'react'
import { connect } from 'react-redux'
import InfoCardList from '../components/InfoCardList'
import { Loading } from '../components/Loading'
import { fetchCourse } from '../actions/course'
import { Lecture } from '../actions/lecture'
import { AddLectureInfoCard } from '../components/AddLectureInfoCard'

const Style = {
	margin: '5px 0'
}

class CourseInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			course: undefined
		}
	}

	componentWillReceiveProps () {
		let course = this.props.courses.items.find((course) => {
			return course.course_id == this.props.course_id
		})

		if (course != undefined && this.state.course == undefined) {
			this.setState({
				course: course
			})

		}
	}

	componentDidMount() {
		if ( this.props.courses.invalid ) {
			this.props.loadCourse(this.props.course_id)
		} else {
			this.loadCourseIntoState()
		}
		this.props.loadLectures(this.props.course_id)
	}

	render() {
		let isFetching = this.props.courses.isFetching,
			invalid = this.props.courses.invalid

		let course = this.state.course
		let lectures = this.props.lectures

		let isLoading = isFetching || invalid ||
      lectures.isFetching || lectures.invalid || course == undefined

		let Content = (
			!isLoading ?
				<div>
					<h2>{course.course_title}</h2>
					<p>{course.course_description}</p>
					<div>
						<h4>Lectures</h4>
						<div className="row">
							<InfoCardList type="lectures"
								lectures={lectures.items}
								course_id={course.course_id}/>
							{
								course != undefined &&
                <AddLectureInfoCard course_title={course.course_title}
                	course_id={course.course_id}/>
							}
						</div>
					</div>
				</div> : <Loading />
		)
		return (
			<div className="container">
				{ Content }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		courses: state.courses,
		lectures: state.lectures
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadCourse: (course_id) => {
			dispatch(fetchCourse(course_id))
		},
		loadLectures: (course_id) => {
			dispatch(Lecture.fetchAll(course_id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo)
