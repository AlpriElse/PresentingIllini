import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import Layout from '../components/Layout'

class Page extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Layout user={this.props.user}>
          {
              this.props.children
          }
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, null)(Page)
