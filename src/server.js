//  Setup Env
const result = require('dotenv').config()
if (result.error) {
  throw result.error
}

const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: dev, dir: 'src'})
const handle = app.getRequestHandler()
app.prepare()
  .then(() => {
    const server = express()

    //  Used for holding temporary data for unmade API/Fiebase
    //  connections
    server.use(express.static('temp'))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:', port)
    })
  })