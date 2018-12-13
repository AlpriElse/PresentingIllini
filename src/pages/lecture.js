import React from 'react'
import { connect } from 'react-redux'
import Page from '../containers/Page'
import PDFViewer from '../components/PDFViewer'
import { Lecture as LectureActions } from '../actions/lecture'
import Loading from '../components/Loading'

class Lecture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 1,
      numPages: null
    }
  }
  static async getInitialProps ({query}) {
    return ({
      course_id: query.course_id,
      lecture_id: query.lecture_id
    })
  }

  componentDidMount() {
    this.props.loadSlides(this.props.lecture_id)
  }
  render() {
    console.log("FILELINK", this.props.slides.items)

    let slides = this.props.slides
    let isLoading = slides.isFetching || slides.invalid
    let content = isLoading ? (
      <Loading />
    ) : (
      <PDFViewer fileLink={this.props.slides.items}/>
    )


    return (
      <Page>
        <div>
          <br/>
          <h2>Lecture</h2>
          <div className="justify-content-center">
             { content }
          </div>
        </div>
      </Page>
    )
  }
}

const mapStateToProps = state => {
  return {
    slides: state.slides
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSlides: (filename) => {
      dispatch(LectureActions.fetchSlides(filename))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lecture)
