import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyCucYzZJXO0f32bk-CivM8gb-26nGgVvH4",
  authDomain: "presenting-illini-aelse2.firebaseapp.com",
  databaseURL: "https://presenting-illini-aelse2.firebaseio.com",
  projectId: "presenting-illini-aelse2",
  storageBucket: "presenting-illini-aelse2.appspot.com",
  messagingSenderId: "94452041846"
}
var fire
if (!firebase.apps.length) {
  fire = firebase.initializeApp(config)
}
export default fire
