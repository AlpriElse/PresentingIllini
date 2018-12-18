import io from 'socket.io-client'
const socket = io('http://localhost:3000')

const connect = (lecture_id) => {
	socket.emit('joinLecture', lecture_id)
}

const subscribe = {
	question: (cb) => {
		socket.on('recieveQuestion', (question) => {
			cb(question)
		})
	},
	slideChange: (cb) => {
		socket.on('recieveSlideChange', (data) => {
			cb(data)
		})
	},
	pollSubmission: (cb) => {
		socket.on('recievePollSubmission', (data) => {
			cb(data)
		})
	}
}

const send = {
	poll: (lecture_id, pollId, answer) => {
		socket.emit('sendPoll', {
			lecture_id, pollId
		})
	}
}

export const instructorSocket = {
	connect,
	subscribe,
	send
}
