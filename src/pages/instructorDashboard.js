import React from 'react'
import { Nav,
  NavItem,
  NavLink,
  Col} from 'reactstrap'
import { connect } from 'react-redux'
import Page from '../containers/Page'


const sidebarStyle = {
  backgroundColor: "#EDEDED",
  height: "100%"
}

class InstructorDashboard extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
			<Page>
        <Col xs="3" style={sidebarStyle}>
          <Nav vertical>
            <NavItem>
              <NavLink className="text-primary">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-primary">Manage Courses</NavLink>
            </NavItem>
          </Nav>
        </Col>
			</Page>
		)
	}
}

export default connect()(InstructorDashboard)
