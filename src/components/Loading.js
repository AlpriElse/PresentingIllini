import React from 'react'

const centerStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}
export const Loading = () => (
	<div className="container text-center" style={centerStyle}>
		<div className="text-center">
			<h1 className="display-4">Loading...</h1>
			<p className="lead">This will only take a moment.</p>
		</div>
	</div>
)
