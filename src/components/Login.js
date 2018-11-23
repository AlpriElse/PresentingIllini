import React from 'react'
import firebase from 'firebase'
import fire from './../fire'

var app = firebase.app()

const Login = () => (
  <div>
    <button onClick={googleLogin()}>Login with Google</button>
  </div>
)

let googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  app.auth().signInWithPopup(provider)
    .then((result) => {
      let token = result.credential.accessToken // Google Access Token
      let user = result.user
      console.log(user.displayName)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Firebase Auth Error")
      console.log(errorCode, errorMessage)
  });
}


export default Login;
