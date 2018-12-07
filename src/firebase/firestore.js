const admin = require('firebase-admin');
const uniqueString = require('unique-string');

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})

module.exports.createCourse = (course) => {
  db.collection("courses").add({
    course_title: course.course_title,
    course_description: course.course_description,
    course_id: uniqueString().slice(0, 8)
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id)
  }).catch((error) => {
    console.error("Error adding document: ", error)
  })
}

module.exports.fetchAllCourses = (callback) => {
  db.collection("courses").get().then((snapshot) => {
    //  doc.id
    let courses = []
    snapshot.forEach((doc) => {
      courses.push(doc.data())
    })
    callback(courses)
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  })
}

module.exports.fetchCourse = (course_id, cb) => {
  db.collection("courses").where('course_id', '==', course_id).get()
    .then(snapshot => {
      if (snapshot.empty) {
        cb("No matches", {})
        return
      }
      let courses = []
      snapshot.forEach(doc => {
        courses.push(doc.data())
      })
      cb("Found", courses[0])
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

}
