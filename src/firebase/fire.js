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
  addLecture: (lecture) => {
    console.log("CALLED ME")
    return new Promise((resolve, reject) => {
      resolve()
      db.collection("lectures").add({
        id: lecture.id,
        title: lecture.title,
        description: lecture.description,
        slides_filename: lecture.slides_filename,
        course_id: lecture.course_id
      }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        resolve()
      }).catch((error) => {
        console.log("Error adding document:", error)
        reject()
      })
    })
  },
  fetchAllCourses: () => {
    return new Promise((resolve, reject) => {
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
  fetchLecture: (lecture_id) => {
    return new Promise((resolve, reject) => {
      db.collection("lectures").where('id', '==', lecture_id).get()
        .then(snapshot => {
          if (snapshot.empty) {
            reject("Can't find requested lecture!")
            return
          }
          let lectures = []
          snapshot.forEach(doc => {
            lectures.push(doc.data())
          })
          resolve(lectures[0])
        })
    }).catch(err => {
      console.log("Error getting documents", err)
      reject("Error getting documents")
    })
  },
  fetchAllLectures: (course_id) => {
    return new Promise((resolve, reject) => {
      db.collection("lectures").where('course_id', '==', course_id).get()
        .then(snapshot => {
          if (snapshot.empty) {
            resolve([])
            return
          }
          let lectures = []
          snapshot.forEach(doc => {
            lectures.push(doc.data())
          })
          resolve(lectures)
        })
        .catch(err => {
          console.log('Error getting documents', err)
          reject("Error getting documents")
        })
    })
  }
}

export const cloudstore = {
  uploadLectureSlides: (slides) => {
    return new Promise((resolve, reject) => {
      let slidesRef = storageRef.child(slides.filename)
      slidesRef.put(slides.file).then((snapshot) => {
        console.log("Uploading lecture...")
        resolve()
      })
    })
  },
  fetchLectureSlides: (slides_filename) => {
    return new Promise((resolve, reject) => {
      let slidesRef = storageRef.child(slides_filename)
      slidesRef.getDownloadURL().then((url) => {
        resolve(url)
      })
    })
  }
}
