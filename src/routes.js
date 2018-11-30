const routes = require('next-routes')()

routes.add('index')
routes.add('courses')
routes.add('course', '/course/:course_id', 'course')
routes.add('lecture','/course/:course_id/lecture/:lecture_id', 'lecture')


module.exports = routes
