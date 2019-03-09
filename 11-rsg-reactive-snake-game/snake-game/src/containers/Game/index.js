import React, { Component } from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import Board from '../../components/Board'
import { startGame } from '../../game/startGame'
import { getGridDimensions, getGrid, getFoodCell, getInitialSnake } from '../../game/gameSetup'
import * as constants from '../../utils/constants'
import * as actions from '../../store/actions'

class Game extends Component {

  componentDidMount() {
    const { mRows, nCols } = getGridDimensions()
    const grid = getGrid()
    const foodCell = getFoodCell()
    const snake = getInitialSnake()

    this.props.gameReady({
      mRows, nCols, grid, foodCell, snake
    })
  }

  changeGameStateHandler = () => {
    setInterval(() => {
      console.log('Start game called');
      startGame()
    }, 300)
  }

  render() {
    let board = null
    if (this.props.gameState !== constants.GAME_NULL) {
      board = <Board 
        grid={this.props.grid}
        foodCell={this.props.foodCell}
        snake={this.props.snake} />
    }

    return (
      <div>
        {board}
        <br/>
        <button className={styles.Button} onClick={this.changeGameStateHandler}>Start Game</button>
        <button className={styles.Button} onClick={this.changeGameStateHandler}>Pause Game</button>
        <button className={styles.Button} onClick={this.changeGameStateHandler}>Finish Game</button>
        <br/>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>Up</button>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>Down</button>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>Left</button>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>Right</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameState: state.game.state,
    mRows: state.game.mRows,
    nCols: state.game.nCols,
    grid: state.game.grid,
    foodCell: state.game.foodCell,
    snake: state.game.snake,
    direction: state.game.direction
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gameReady: (payload) => dispatch(actions.gameReady(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)