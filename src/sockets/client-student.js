import io from 'socket.io-client'
const socket = io('http://localhost:3000')

const connect = (lecture_id) => {
  socket.on('connect', () => {
    socket.emit('lecture', lecture_id)
  })
}

const askQuestion = (lecture_id, question) => {
  socket.emit('askQuestion', {
    lecture_id,
    question
  })
}

export const studentSocket = {
  connect,
  askQuestion
}
