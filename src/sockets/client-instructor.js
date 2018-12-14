import io from 'socket.io-client'
const socket = io('http://localhost:3000')

const connect = (lecture_id) => {
  socket.on('connect', () => {
    socket.emit('lecture', lecture_id)
  })
}

const subscribe = {
  recieveQuestion: (cb) => {
    socket.on('recieveQuestion', (question) => {
      cb(question)
    })
  }
}
export const instructorSocket = {
  connect,
  subscribe
}
