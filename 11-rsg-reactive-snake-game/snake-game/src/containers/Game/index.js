import React, { Component } from 'react'
// import styles from './index.module.css'
import { connect } from 'react-redux'
import Board from '../../components/Board'
import { startGame } from '../../game/startGame'
import { getGridDimensions, getGrid, getFoodCell, getInitialSnake } from '../../game/gameSetup'
import { placeFoodOnGrid, placeSnakeOnGrid } from '../../game/placeFoodAndSnake'
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

  startGameHandler = () => {
    startGame()
  }

  render() {

    let grid = null
    let board = null

    if (this.props.gameState !== constants.GAME_NULL) {
      grid = placeFoodOnGrid({
        grid: this.props.grid,
        foodCell: this.props.foodCell,
        mRows: this.props.mRows,
        nCols: this.props.nCols
      })
  
      grid = placeSnakeOnGrid({
        grid: this.props.grid,
        snake: this.props.snake,
        mRows: this.props.mRows,
        nCols: this.props.nCols
      })

      board = <Board grid={grid} />
    }

    return (
      <div>
        {board}
        <br/>
        <button onClick={this.startGameHandler}>Start Game</button>
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
    snake: state.game.snake
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gameReady: (payload) => dispatch(actions.gameReady(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)