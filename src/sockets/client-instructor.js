import io from 'socket.io-client'
const socket = io('http://localhost:3000')

const connect = (lecture_id) => {
	socket.emit('joinLecture', lecture_id)
	console.log("running")
}

const subscribe = {
	question: (cb) => {
		socket.on('recieveQuestion', (question) => {
			cb(question)
		})
	}
}

const create = {
	poll: (poll) => {
		socket.emit('createPoll', poll)
	}
}

export const instructorSocket = {
	connect,
	subscribe,
	create
}
