import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import googleLogin from './../firebase/googleLogin'
import { setUser } from '../actions/user.js'

class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.dispatchSetUser = this.dispatchSetUser.bind(this)
	}
	dispatchSetUser(name) {
		const {dispatch} = this.props
		dispatch(setUser(name))
	}
	render() {
		let message = this.props.user ? (
			<div>
				<p>{this.props.user}</p>
			</div>
		) : (
			<button className="btn btn-link"
				onClick={() => {
					googleLogin(this.dispatchSetUser)
				}}>Login</button>
		)

		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="/">Presenting Illini</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link href="/"><a className="nav-link">Home</a></Link>
						</li>
						<li className="nav-item">
							<Link href="/courses"><a className="nav-link">Courses</a></Link>
						</li>
					</ul>
					<div>
						{message}
					</div>
				</div>
			</nav>
		)
	}
}
export default connect()(Nav)
