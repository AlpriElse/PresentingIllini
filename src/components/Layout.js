import Nav from './Nav'

const Layout = (props) => (
  <div>
    <Nav />
    <div className="container">
    {props.children}
    </div>
  </div>
)


export default Layout
