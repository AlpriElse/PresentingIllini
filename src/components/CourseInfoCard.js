import React from 'react'
import PropTypes from 'prop-types'

import {
	Col,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText } from 'reactstrap'
const Style = {
	margin: '15px 0'
}

export const CourseInfoCard = (props) => (
	<Col md="6">
		<Card style={Style}>
			<CardBody>
				<CardTitle>{props.course_title}</CardTitle>
				<CardSubtitle>{props.instructor}</CardSubtitle>
				<CardText>{props.course_description}</CardText>
				<a role="button" className="btn btn-primary" href={'/course/' + props.course_id}>Go to Course</a>
			</CardBody>
		</Card>
	</Col>
)

CourseInfoCard.defaultProps = {
	course_description: "No description available.",
	instructor: "Instructor not listed."
}

CourseInfoCard.propTypes = {
	course_title: PropTypes.string.isRequired,
	instructor: PropTypes.string,
	course_description: PropTypes.string,
	course_id: PropTypes.string.isRequired
}
