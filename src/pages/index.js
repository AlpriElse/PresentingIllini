// import Header from '../components/Header'
// import Layout from '../components/Layout'
// import LoginPage from '../containers/LoginPage'
//
// const Index = () => (
//   <div>
//     <Header />
//     <Layout>
//       <LoginPage />
//     </Layout>
//   </div>
// )
//
// export default Index
import React from 'react'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../store'
import Examples from '../components/examples'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    const {dispatch} = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <Examples />
    )
  }
}

export default connect()(Index)
