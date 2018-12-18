import React from 'react'
import PropTypes from 'prop-types'

import {
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText } from 'reactstrap'

const Style = {
	margin: '15px 0'
}

export const AddLectureInfoCard = (props) => (
	<Col md="12">
		<Card style={Style}>
			<CardBody>
				<CardTitle>Add New Lecture</CardTitle>
				<CardText>Add lecture to {props.course_title}</CardText>
				<a role="button" className="btn btn-primary" href={'/edit/addLecture/course/' + props.course_id}>Add Lecture</a>
			</CardBody>
		</Card>
	</Col>
)

AddLectureInfoCard.propTypes = {
	course_title: PropTypes.string.isRequired,
	course_id: PropTypes.string.isRequired
}
