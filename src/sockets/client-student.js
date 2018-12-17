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

const create = {
	question: (lecture_id, question) => {
		socket.emit('createQuestion', {
			lecture_id, question
		})
	},
	slideChange: (lecture_id, slide_number, user) => {
		socket.emit('slideChange', {
			lecture_id, slide_number, user
		})
	},
	pollSubmission: (lecture_id, pollId, submission) => {
		socket.emit('createPollSubmission', {
			lecture_id, pollId, submission
		})
	}
}

export const studentSocket = {
	connect,
	create,
	subscribe

}
