const express = require('express')
const next = require('next')
const routes = require('./routes')
const api_routes = require('./routes/api.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const initSockets = require('./sockets/api')


//  Setup env vars
const result = require('dotenv').config()
if (result.error) {
  throw result.error
}

const port = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({
  dev,
  dir: './src'
})
const handler = routes.getRequestHandler(nextApp)
console.log("Starting server...")
nextApp.prepare().then(() => {
  const app = express()
  const server = require('http').Server(app)

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  //  Used for holding temporary data for unmade API/Fiebase
  //  connections
  app.use('/api', api_routes)

  app.use(handler)



  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:', port)
  })
})

//  Start socketio
const socket_port = 3000
initSockets(socket_port)
