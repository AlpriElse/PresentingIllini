import React from 'react'

const Style = {
  margin: '15px 0'
}

class CourseInfoCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-6">
        <div className="card" style={Style}>
          <div className="card-body">
            <h4 className="card-title">{this.props.course_name}</h4>
            <h5 className="card-title">{this.props.instructor}</h5>
            <p className="card-text">{this.props.course_description}</p>
            <a role="button" className="btn btn-primary" href={"/course/" + this.props.course_id}>Go to Course</a>
          </div>
        </div>
      </div>
    )
  }

}

export default CourseInfoCard
