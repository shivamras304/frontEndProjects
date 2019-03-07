import React, { Component } from 'react'
import styles from './index.module.css'
import Board from '../Board'
import { startGame } from '../../game/startGame'

class ComponentTester extends Component {

  startGameHandler = () => {
    startGame()
  }

  render() {
    return (
      <div className={styles.Main}>
        <Board></Board>
        <br/>
        <button onClick={this.startGameHandler}>Start Game</button>
      </div>
    )
  }
}

export default ComponentTester