const http = require('http')
const express = require('express')
const next = require('next')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const initSockets = require('./sockets/api')

//  Setup env vars
const result = require('dotenv').config()
if (result.error) {
	throw result.error
}

const PORT = process.env.PORT || 5000

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handler = routes.getRequestHandler(nextApp)

nextApp.prepare().then(() => {
	const app = express()
	const server = http.createServer(app)
	initSockets(server)

	app.use(cors())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(handler)

	server.listen(PORT, (err) => {
		if (err) throw err
		console.log('> Ready on http://localhost:', PORT)
	})
})
