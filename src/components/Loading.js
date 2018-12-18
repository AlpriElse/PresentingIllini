import React from 'react'

import { Container } from 'reactstrap'

export const Loading = () => (
	<Container className="text-center">
		<div className="text-center">
			<h1 className="display-4">Loading...</h1>
			<p className="lead">This will only take a moment.</p>
		</div>
	</Container>
)
