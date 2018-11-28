import Header from '../components/Header'
import Layout from '../components/Layout'
import CourseList from '../containers/CourseList'

const Courses = () => (
  <div>
    <Header />
    <Layout>
      <CourseList/>
    </Layout>
  </div>
)
export default Courses
