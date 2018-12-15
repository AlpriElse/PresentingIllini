import React from 'react'
import { connect } from 'react-redux'
import InfoCardList from '../components/InfoCardList'
import Loading from '../components/Loading'
import AddCourseInfoCard from '../components/AddCourseInfoCard'
import { fetchAllCourses } from '../actions/course.js'

class CourseList extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.loadCourses()
	}

	updateCourseList(status, courses) {
		console.log(courses)
		if (status == 'Success') {
			this.setState({
				courses: courses
			})
		}
		this.setState({
			isLoading: false
		})

	}

	render() {
		const courses = this.props.courses
		let showLoading = courses.isFetching || courses.invalid


		let Content = showLoading ? <Loading /> :
			<InfoCardList type="courses"
				courses={courses.items}/>

		return (
			<div className="container">
				<br />
				<h2>Courses</h2>
				<div className="row">
					{
						Content
					}
					{
						!showLoading && <AddCourseInfoCard />
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		courses: state.courses
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadCourses: () => {
			dispatch(fetchAllCourses())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
