const routes = require('next-routes')()

routes.add('index')
routes.add('courses')
routes.add('course', '/course/:course_id', 'course')


module.exports = routes
