import React from 'react'

const Style = {
  margin: '15px 0'
}

class AddLectureInfoCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-12">
        <div className="card" style={Style}>
          <div className="card-body">
            <h4 className="card-title">Add New Lecture</h4>
            <p className="card-text">Add lecture to {this.props.course_title}</p>
            <a role="button" className="btn btn-primary" href={"/edit/addLecture/course/" + this.props.course_id}>Add Lecture</a>
          </div>
        </div>
      </div>
    )
  }

}

export default AddLectureInfoCard
