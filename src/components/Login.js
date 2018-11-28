import React from 'react'
import firebase from 'firebase'
import fire from './../fire'

var app = firebase.app()

const Login = () => (
  <div>
    <button className="btn btn-danger" onClick={googleLogin}><strong>Login with Google</strong></button>
  </div>
)

let googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  app.auth().signInWithRedirect(provider)
    .then((result) => {
      let token = result.credential.accessToken // Google Access Token
      let user = result.user
      alert("Signed In! Hi, " + user.displayName)
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
