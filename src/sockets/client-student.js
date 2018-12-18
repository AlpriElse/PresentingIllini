import io from 'socket.io-client'
const socket = io('http://localhost:3000')

const connect = (lecture_id) => {
	socket.emit('joinLecture', lecture_id)
}

const subscribe = {
	poll: (cb) => {
		socket.on('recievePoll', (poll) => {
			cb(poll)
		})
	}
}

const send = {
	question: (lecture_id, question) => {
		socket.emit('sendQuestion', {
			lecture_id, question
		})
	},
	slideChange: (lecture_id, slide_number, user) => {
		socket.emit('sendSlideChange', {
			lecture_id, slide_number, user
		})
	},
	pollSubmission: (lecture_id, user, poll_id, answer) => {
		socket.emit('sendPollSubmission', {
			lecture_id, user, poll_id, answer
		})
	}
}

export const studentSocket = {
	connect,
	send,
	subscribe
}
