//  Setup Env
const result = require('dotenv').config()
if (result.error) {
  throw result.error
}

const express = require('express')
const next = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: dev, dir: 'src'})
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  //  Used for holding temporary data for unmade API/Fiebase
  //  connections
  server.use(express.static('temp'))

  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:', port)
  })
})
