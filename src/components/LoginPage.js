import React from 'react'
import Login from '../components/Login'

const LoginPage = () => (
	<div className="container">
		<br/>
		<br/>
		<div className="row justify-content-center">
			<div className="card col-4">
				<div className="card-body text-center">
					<h3>Presenting Illini</h3>
					<h6>An interactive lecture and presenting tool for computer science.</h6>
					<hr/>
					<Login/>
				</div>
			</div>
		</div>
	</div>
)


export default LoginPage
