import Header from '../components/Header'
import Layout from '../components/Layout'
import CourseViewer from '../containers/CourseViewer'

const Courses = () => (
  <div>
    <Header />
    <Layout>
      <CourseViewer/>
    </Layout>
  </div>
)
export default Courses
