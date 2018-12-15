import React from 'react'
import PropTypes from 'prop-types'

const Style = {
	margin: '15px 0'
}

export const AddLectureInfoCard = (props) => (
	<div className="col-12">
	<div className="card" style={Style}>
	<div className="card-body">
	<h4 className="card-title">Add New Lecture</h4>
	<p className="card-text">Add lecture to {props.course_title}</p>
	<a role="button" className="btn btn-primary" href={'/edit/addLecture/course/' + props.course_id}>Add Lecture</a>
	</div>
	</div>
	</div>
)

AddLectureInfoCard.propTypes = {
	course_title: PropTypes.string.isRequired,
	course_id: PropTypes.string.isRequired
}
