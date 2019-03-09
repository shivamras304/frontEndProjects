import React, { Component } from 'react'
import styles from './index.module.css'
import { connect } from 'react-redux'
import Board from '../../components/Board'
import { moveSnake } from '../../game/moveSnake'
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

  changeGameStateHandler = () => {
    setInterval(() => {
      console.log('Start game called');
      moveSnake()
    }, 300)
  }

  changeSnakeDirectionHandler = (event) => {
    switch(event.target.innerText) {
      case constants.UP: this.props.onChangeSnakeDirection(constants.UP) 
                            break;
      case constants.DOWN: this.props.onChangeSnakeDirection(constants.DOWN) 
                            break;
      case constants.LEFT: this.props.onChangeSnakeDirection(constants.LEFT) 
                            break;
      case constants.RIGHT: this.props.onChangeSnakeDirection(constants.RIGHT) 
                            break;
      default: console.log('matche default')
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
      <div>
        {board}
        <br/>
        <button className={styles.Button} onClick={this.changeGameStateHandler}>Start Game</button>
        <button className={styles.Button} onClick={this.changeGameStateHandler}>Pause Game</button>
        <button className={styles.Button} onClick={this.changeGameStateHandler}>Finish Game</button>
        <br/>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>{constants.UP}</button>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>{constants.DOWN}</button>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>{constants.LEFT}</button>
        <button className={styles.Button} onClick={this.changeSnakeDirectionHandler}>{constants.RIGHT}</button>
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
    onGameReady: (payload) => dispatch(actions.gameReady(payload)),
    onChangeSnakeDirection: (direction) => dispatch(actions.changeSnakeDirection(direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)