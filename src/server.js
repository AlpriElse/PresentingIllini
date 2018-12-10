//  Setup Env
const result = require('dotenv').config()
if (result.error) {
  throw result.error
}

const express = require('express')
const next = require('next')
const routes = require('./routes')
const api_routes = require('./routes/api.js')
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handler = routes.getRequestHandler(app)

console.log("Starting server...")
app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  //  Used for holding temporary data for unmade API/Fiebase
  //  connections
  server.use('/api', api_routes)

  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:', port)
  })
})
