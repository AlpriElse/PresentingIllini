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
			io.sockets.in(data.lecture_id).emit('recievePoll', data.poll)
		})

		socket.on('sendSlideChange', (data) => {
			//	TODO: Save slide changes to firestore
			io.sockets.in(data.lecture_id).emit('recieveSlideChange', {
				user: data.user,
				slide_number: data.slide_number
			})
		})

		socket.on('sendPollSubmission', (data) => {
			//	TODO: Save submissions on firestore
			io.sockets.in(data.lecture_id).emit('recievePollSubmission', {
				user: data.user,
				poll_id: data.poll_id,
				answer: data.answer
			})
		})
	})
	io.listen(port)
}


module.exports = initSocketListening
