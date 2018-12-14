import io from 'socket.io-client'
const socket = io('http://localhost:3000')

const connect = (lecture_id) => {
  socket.on('connect', () => {
    socket.emit('lecture', lecture_id)
  })
}

const subscribe = {
  poll: (cb) => {
    socket.on('recievePoll', (poll) => {
      cb(poll)
    })
  }
}

const create = {
  question: (lecture_id, question) => {
    socket.emit('createQuestion', {
      lecture_id, question
    })
  }
}

export const studentSocket = {
  connect,
  create,
  subscribe
}
