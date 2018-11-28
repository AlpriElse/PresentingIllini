import React from 'react'

const Style = {
  margin: '15px'
}

class CourseInfoCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card col-md-12" style={Style}>
        <div className="card-body">
          <h4 className="card-title">{this.props.course_name}</h4>
          <h5 className="card-title">{this.props.instructor}</h5>
          <p className="card-text">{this.props.course_description}</p>
          <a role="button" className="btn btn-primary" href="">Go to Course</a>
        </div>
      </div>
    )
  }

}

export default CourseInfoCard
