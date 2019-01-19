import React from 'react'
import PropTypes from 'prop-types'

import Moment from 'moment'
import { CourseInfoCard } from './CourseInfoCard'
import { LectureInfoCard } from './LectureInfoCard'

import {
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText
} from 'reactstrap'


export default class InfoCardList extends React.Component {
	constructor(props) {
		super(props)
	}

	renderCourseList() {
		return (
			this.props.courses.map((e) => {
				return (
					<CourseInfoCard
						course_title={e.course_title}
						course_description={e.course_description}
						instructor={e.instructor}
						course_id={e.course_id}/>
				)
			})
		)
	}

	renderLectureList() {
		if (this.props.lectures.length == 0) {
			return (
				<Col md="12">
					<Card>
						<CardBody>
							<CardTitle>No lectures available.</CardTitle>
							<CardText>This may be a mistake, contact your instructor</CardText>
						</CardBody>
					</Card>
				</Col>
			)
		}
		return (
			this.props.lectures.map((e) => {
				let date = Moment(e.date).format('MMMM, Do YYYY')
				let link = '/course/' + this.props.course_id + '/lecture/'
          + e.id

				return (
					<LectureInfoCard
						date={date}
						lecture_title={e.title}
						lecture_description={e.description}
						link={link}/>
				)
			})
		)
	}

	render() {
		switch(this.props.type) {
		case 'lectures':
			return this.renderLectureList()
			break
		case 'courses':
			return this.renderCourseList()
			break
		}
	}
}

InfoCardList.defaultProps = {
	courses: [],
	lectures: []
}

//	TODO: make one of props.courses OR props.lectures required
InfoCardList.propTypes = {
	type: PropTypes.string.isRequired
}
