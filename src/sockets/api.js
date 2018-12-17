const io = require('socket.io')()

const initSocketListening = (port) => {
	io.on('connection', (socket) => {
		socket.on('joinLecture', (lecture_id) => {
			console.log("Joining", lecture_id)
			socket.join(lecture_id)
		})

		socket.on('createQuestion', (data) => {
			console.log("Sending to ", data.lecture_id)
			io.sockets.in(data.lecture_id).emit('recieveQuestion', data.question)
		})

		socket.on('createPoll', (data) => {
			io.sockets.in(data.lecture_id).emit('recievePoll', data)
		})

		socket.on('slideChange', (data) => {
			io.sockets.in(data.lecture_id).emit('recieveSlideChange', data)
		})

		socket.on('createPollSubmission', (data) => {
			io.sockets.in(data.lecture_id).emit('recievePollSubmission', data)
		})
	})
	io.listen(port)
}


module.exports = initSocketListening
