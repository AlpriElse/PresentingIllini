import React from 'react'
import PropTypes from 'prop-types'

import {
	Col,
	Card,
	CardBody,
	CardTitle,
	CardText } from 'reactstrap'

let style = {
	margin: '5px 0'
}

export const LectureInfoCard = (props) => (
	<Col md="12" style={style}>
		<Card>
			<CardBody>
				<CardTitle>{props.lecture_title} <span className="float-right">{props.date}</span></CardTitle>
				<CardText>{props.lecture_description}</CardText>
				<a className="btn btn-primary" href={props.link}>See Lecture</a>
			</CardBody>
		</Card>
	</Col>
)

LectureInfoCard.defaultProps = {
	lecture_description: "No description available.",
	date: ""
}

LectureInfoCard.propTypes = {
	lecture_title: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
}
