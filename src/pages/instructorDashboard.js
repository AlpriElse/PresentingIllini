import React from 'react'
import { Nav,
	NavItem,
	NavLink,
	Row,
	Col} from 'reactstrap'
import { connect } from 'react-redux'
import Page from '../containers/Page'

class InstructorDashboard extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
			<Page>
				<Row>
					<Col xs="2">
						<p>List Based</p>
						<Nav vertical>
							<NavItem>
								<NavLink href="#">Link</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">Link</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="#">Another Link</NavLink>
							</NavItem>
							<NavItem>
								<NavLink disabled href="#">Disabled Link</NavLink>
							</NavItem>
						</Nav>
						<hr />
						<p>Link based</p>
						<Nav vertical>
							<NavLink href="#">Link</NavLink>
							<NavLink href="#">Link</NavLink>
							<NavLink href="#">Another Link</NavLink>
							<NavLink disabled href="#">Disabled Link</NavLink>
						</Nav>
					</Col>
				</Row>
			</Page>
		)
	}
}

export default connect()(InstructorDashboard)
