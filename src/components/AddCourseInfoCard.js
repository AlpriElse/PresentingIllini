import React from 'react'
import PropTypes from 'prop-types'

import {
	Card,
	CardTitle,
	CardText,
	CardBody,
	Button,
 	Col } from 'reactstrap'

const Style = {
	margin: '15px 0'
}

const AddCourseInfoCard = () => (
	<Col md="6">
		<Card style={Style}>
			<CardBody>
				<CardTitle>Add New Course</CardTitle>
				<CardText>Add your course to Presenting Illini!</CardText>
				<a role="button" className="btn btn-primary" href={'/edit/createCourse'}>Create Course</a>
			</CardBody>
		</Card>
	</Col>
)
export default AddCourseInfoCard
