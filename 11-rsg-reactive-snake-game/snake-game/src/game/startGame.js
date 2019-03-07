// TODO: setup global game configurations and start the game 
import { getGridDimensions, getGrid, getFoodCell, getInitialSnake } from './gameSetup'
import { gameStart } from '../store/actions'
import { store } from '../index'

const startGame = () => {
  // Setting up game values
  const { mRows, nCols } = getGridDimensions()
  const grid = getGrid()
  const foodCell = getFoodCell()
  const snake = getInitialSnake()

  store.dispatch(gameStart({
    mRows,
    nCols,
    grid,
    foodCell,
    snake
  }))

  // Write code to  move the snake
}

export {
  startGame
}