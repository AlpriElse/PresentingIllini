const routes = require('next-routes')


module.exports = routes()
	.add('index')
	.add('courses')
	.add('course', '/course/:course_id')
	.add({
		page: 'lecture',
		pattern: '/course/:course_id/lecture/:lecture_id'
	})
	.add({
		page: 'lecture',
		pattern: '/course/:course_id/lecture/:lecture_id/:instructor'
	})
	.add({
		page: 'edit',
		pattern: '/edit/:page'
	})
	.add({
		page: 'edit',
		pattern: '/edit/:page/course/:course_id'
	})
	.add({
		page: 'instructorDashboard',
		pattern: '/dashboard'
	})
