import React from 'react'
import PropTypes from 'prop-types'

const Style = {
	margin: '15px 0'
}

export const CourseInfoCard = (props) => (
	<div className="col-6">
		<div className="card" style={Style}>
			<div className="card-body">
				<h4 className="card-title">{props.course_title}</h4>
				<h5 className="card-title">{props.instructor}</h5>
				<p className="card-text">{props.course_description}</p>
				<a role="button" className="btn btn-primary" href={'/course/' + props.course_id}>Go to Course</a>
			</div>
		</div>
	</div>
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
