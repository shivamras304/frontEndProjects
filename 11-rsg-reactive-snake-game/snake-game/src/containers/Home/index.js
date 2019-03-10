import React, { Component } from 'react'
// import styles from './index.module.css'
import Game from '../Game'
import Auth from '../Auth'

class Home extends Component {
  render() {
    return (
      <div>
        <Auth />
        <Game />
      </div>
    )
  }
}

export default Home