import React from 'react'
import {connect} from 'react-redux'

import googleLogin from './../firebase/googleLogin'
import { setUser } from '../actions/user.js'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.dispatchSetUser = this.dispatchSetUser.bind(this)
  }

  dispatchSetUser(name) {
    const {dispatch} = this.props
    dispatch(setUser(name))
  }

  render () {
    return (
      <div>
        <button className="btn btn-danger"
          onClick={() => {
            googleLogin(this.dispatchSetUser)
          }}><strong>Login with Google</strong></button>
      </div>
    )
  }
}

export default connect()(Login)
