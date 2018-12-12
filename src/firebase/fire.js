import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import { config } from './.config'
import uniqueString from 'unique-string'

let fire = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

const storageRef = firebase.storage().ref()

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

export const firestore = {
  addCourse: (course) => {
    return new Promise((resolve, reject) => {
      db.collection("courses").add({
        course_title: course.course_title,
        course_description: course.course_description,
        course_id: uniqueString().slice(0, 8)
      }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        resolve()
      }).catch((error) => {
        console.error("Error adding document: ", error)
        reject()
      })
    })
  },
  fetchAllCourses: () => {
    return new Promise((resolve, reject) => {
      console.log("IN PROMISE")
      db.collection("courses").get().then((snapshot) => {
        //  doc.id
        let courses = []
        snapshot.forEach((doc) => {
          courses.push(doc.data())
        })
        console.log("DONE")
        resolve(courses)
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      })
    })
  },
  fetchCourse: (course_id) => {
    return new Promise((resolve, reject) => {
      db.collection("courses").where('course_id', '==', course_id).get()
      .then(snapshot => {
        if (snapshot.empty) {
          reject("No matches")
          return
        }
        let courses = []
        snapshot.forEach(doc => {
          courses.push(doc.data())
        })
        resolve(courses[0])
      })
      .catch(err => {
        console.log('Error getting documents', err)
        reject("Error getting documents")
      })
    })
  },
  addLecture: (lecture) => {

  }

}

export const cloudstore = {
  uploadLecture: (slides) => {
    console.log(slides)
    return new Promise((resolve, reject) => {
      console.log(slides.name)
      let slidesRef = storageRef.child(slides.name)
      slidesRef.put(slides).then((snapshot) => {
        console.log("Uploading lecture...")
        resolve()
      })
    })
  }
}
