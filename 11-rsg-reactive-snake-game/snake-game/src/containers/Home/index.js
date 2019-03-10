import React, { Component } from 'react'
// import styles from './index.module.css'
import Game from '../Game'
import Auth from '../Auth'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <div>
        {this.props.isSignedIn ? <Game /> : <Auth />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps)(Home)