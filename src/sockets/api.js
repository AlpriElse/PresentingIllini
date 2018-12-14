const io = require('socket.io')()

const initSocketListening = (port) => {
  io.on('connection', (socket) => {
    socket.on('lecture', (lecture_id) => {
      socket.join(lecture_id)
    })

    socket.on('askQuestion', (data) => {
      io.sockets.emit('recieveQuestion', data.question)
      //  io.sockets.in(data.lecture_id).emit('recieveQuestion', data.question)
    })
  })
  io.listen(port)
}


module.exports = initSocketListening
