const routes = require('next-routes')


module.exports = routes()
.add('index')
.add('courses')
.add('course', '/course/:course_id')
.add('lecture', '/course/:course_id/lecture/:lecture_id')
.add('edit', '/edit/:page')
