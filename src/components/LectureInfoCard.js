import React from 'react'

let style = {
  margin: '5px 0'
}

export default class LectureInfoCard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="col-12" style={style}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.date} {this.props.lecture_title}</h5>
            <p className="card-text">{this.props.lecture_description}</p>
            <a className="btn btn-primary" href={this.props.link}>See Lecture</a>
          </div>
        </div>
      </div>
    )
  }
}
