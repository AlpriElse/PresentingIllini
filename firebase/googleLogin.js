import firebase from 'firebase'

let googleLogin = (callback) => {
  let app = firebase.app()
  const provider = new firebase.auth.GoogleAuthProvider()

  app.auth().signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken // Google Access Token
      let user = result.user
      callback(user.displayName)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Firebase Auth Error")
      console.log(errorCode, errorMessage)
  });
}

export default googleLogin
