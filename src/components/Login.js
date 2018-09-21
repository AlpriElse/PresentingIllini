import React from 'react'
import GoogleLogin from 'react-google-login'

function onSignIn(googleUser) {
    console.log(googleUser);
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function onError(err) {
  console.log("Error logging in!")
  console.log(err)
}
const Login = () => (
  <div>
    <GoogleLogin
    clientId="299093187133-e5fdhp780t5r9qeoo2fju8efi0va6olc.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={onSignIn}
    onFailure={onError}
    />
  </div>
)


export default Login;
