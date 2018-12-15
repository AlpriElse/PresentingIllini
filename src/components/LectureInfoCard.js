import React from 'react'
import PropTypes from 'prop-types'

let style = {
	margin: '5px 0'
}

export const LectureInfoCard = (props) => (
	<div className="col-12" style={style}>
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{props.lecture_title} <span className="float-right">{props.date}</span></h5>
				<p className="card-text">{props.lecture_description}</p>
				<a className="btn btn-primary" href={props.link}>See Lecture</a>
			</div>
		</div>
	</div>

)

LectureInfoCard.defaultProps = {
	lecture_description: "No description available.",
	date: ""
}

LectureInfoCard.propTypes = {
	lecture_title: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
}
