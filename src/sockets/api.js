const io = require('socket.io')()

const initSocketListening = (port) => {
	io.on('connection', (socket) => {
		socket.on('joinLecture', (lecture_id) => {
			console.log("Joining", lecture_id)
			socket.join(lecture_id)
		})

		socket.on('sendQuestion', (data) => {
			console.log("Sending to ", data.lecture_id)
			//	TODO: Save questions to firestore
			io.sockets.in(data.lecture_id).emit('recieveQuestion', data.question)
		})

		socket.on('sendPoll', (data) => {
			//	TODO: Save poll to firestore
			io.sockets.in(data.lecture_id).emit('recievePoll', data)
		})

		socket.on('slideChange', (data) => {
			//	TODO: Save slide changes to firestore
			io.sockets.in(data.lecture_id).emit('recieveSlideChange', data)
		})

		socket.on('sendPollSubmission', (data) => {
			//	TODO: Save submissions on firestore
			io.sockets.in(data.lecture_id).emit('recievePollSubmission', data)
		})
	})
	io.listen(port)
}


module.exports = initSocketListening
