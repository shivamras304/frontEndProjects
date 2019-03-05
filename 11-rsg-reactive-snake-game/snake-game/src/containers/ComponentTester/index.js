import React, { Component } from 'react'
import styles from './index.module.css'
import Board from '../Board'

class ComponentTester extends Component {
  render() {
    return (
      <div className={styles.Main}>
        <Board></Board>
      </div>
    )
  }
}

export default ComponentTester