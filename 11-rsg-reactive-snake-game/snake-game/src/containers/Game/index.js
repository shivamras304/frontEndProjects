import React, { Component } from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import Board from '../../components/Board'
import { getGridDimensions, getGrid, getFoodCell, getInitialSnake } from '../../game/gameSetup'
import * as constants from '../../utils/constants'
import * as actions from '../../store/actions'

class Game extends Component {

  componentDidMount() {
    const { mRows, nCols } = getGridDimensions()
    const grid = getGrid()
    const foodCell = getFoodCell()
    const snake = getInitialSnake()

    this.props.onGameReady({
      mRows, nCols, grid, foodCell, snake
    })
  }

  changeGameStateHandler = (event) => {

    switch (event.target.dataset.state) {
      case constants.GAME_PLAYING: this.props.onGamePlaying() 
        break;
      case constants.GAME_PAUSED: this.props.onGamePaused() 
        break;
      case constants.GAME_OVER: this.props.onGameOver() 
        break;
      default:
        return
    }
  }

  keyDownHandler = (event) => {
    event.preventDefault()
    
    // Arrow keys should work only when the game is in playing mode
    if (event.which !== 32 && this.props.gameState !== constants.GAME_PLAYING) {
      return;
    }

    switch (event.which) {
      case 32: // Spacebar is pressed
        if (this.props.gameState === constants.GAME_PAUSED
           || this.props.gameState === constants.GAME_READY) {
          this.props.onGamePlaying()
        } else if (this.props.gameState === constants.GAME_PLAYING) {
          this.props.onGamePaused()
        }
        break;
      case 37: // Left Arrow key is pressed
        if (this.props.direction === constants.UP
          || this.props.direction === constants.DOWN) {
          this.props.onChangeSnakeDirection(constants.LEFT)
        }
        break;
      case 38: // Up Arrow key is pressed
        if (this.props.direction === constants.LEFT
          || this.props.direction === constants.RIGHT) {
          this.props.onChangeSnakeDirection(constants.UP)
        }
        break;
      case 39: // Right Arrow key is pressed
        if (this.props.direction === constants.UP
          || this.props.direction === constants.DOWN) {
          this.props.onChangeSnakeDirection(constants.RIGHT)
        }
        break;
      case 40: // Down Arrow key is pressed
        if (this.props.direction === constants.LEFT
          || this.props.direction === constants.RIGHT) {
          this.props.onChangeSnakeDirection(constants.DOWN)
        }
        break;
      default: return
    }
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
      <div onKeyDown={this.keyDownHandler}>
        {board}
        <div>Score: {this.props.score}</div>
        <br/>
        <button data-state={constants.GAME_PLAYING} className={styles.Button} onClick={this.changeGameStateHandler}>Play Game</button>
        <button data-state={constants.GAME_PAUSED} className={styles.Button} onClick={this.changeGameStateHandler}>Pause Game</button>
        <button data-state={constants.GAME_OVER} className={styles.Button} onClick={this.changeGameStateHandler}>Finish Game</button>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameState: state.game.gameState,
    mRows: state.game.mRows,
    nCols: state.game.nCols,
    grid: state.game.grid,
    foodCell: state.game.foodCell,
    snake: state.game.snake,
    direction: state.game.direction,
    score: state.game.score
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGameReady: (payload) => dispatch(actions.gameReady(payload)),
    onGamePlaying: (payload) => dispatch(actions.gamePlaying(payload)),
    onGamePaused: (payload) => dispatch(actions.gamePaused(payload)),
    onChangeSnakeDirection: (direction) => dispatch(actions.changeSnakeDirection(direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)