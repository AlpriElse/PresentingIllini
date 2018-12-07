import React from 'react'

const Style = {
  margin: '15px 0'
}

class AddCourseInfoCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-6">
        <div className="card" style={Style}>
          <div className="card-body">
            <h4 className="card-title">Add New Course</h4>
            <p className="card-text">Add your course to Presenting Illini!</p>
            <a role="button" className="btn btn-primary" href={"/edit/createCourse"}>Create Course</a>
          </div>
        </div>
      </div>
    )
  }

}

export default AddCourseInfoCard
