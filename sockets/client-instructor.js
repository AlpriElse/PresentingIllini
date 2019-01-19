import io from 'socket.io-client'
const socket = io('/')

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
	poll: (lecture_id, poll) => {
		socket.emit('sendPoll', {
			lecture_id, poll
		})
	}
}

export const instructorSocket = {
	connect,
	subscribe,
	send
}
