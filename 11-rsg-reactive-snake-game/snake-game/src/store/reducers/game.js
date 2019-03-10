import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../utils/updateObject'
import * as constants from '../../utils/constants'
import { moveSnake as moveSnakeHelper } from '../../game/moveSnake'

const initialState = {
  gameState: constants.GAME_NULL,
  mRows: null,
  nCols: null,
  grid: null,
  foodCell: null,
  snake: null,
  direction: constants.UP,
  freezeSnake: null,
  snakeSpeed: 500,
  score: 0,
  scoreAdder: 5
}

const gameReady = (state, action) => {
  return updateObject(state, {
    gameState: constants.GAME_READY,
    mRows: action.mRows,
    nCols: action.nCols,
    grid: action.grid,
    foodCell: action.foodCell,
    snake: action.snake,
    score: 0
  })
}

const gamePlaying = (state, action) => {

  const freezeSnake = setInterval(() => {
    moveSnakeHelper()
  }, state.snakeSpeed)

  return updateObject(state, {
    gameState: constants.GAME_PLAYING,
    freezeSnake: freezeSnake
  })
}

const gamePaused = (state, action) => {

  clearInterval(state.freezeSnake)

  return updateObject(state, {
    gameState: constants.GAME_PAUSED,
    freezeSnake: null
  })
}

const gameOver = (state, action) => {

  clearInterval(state.freezeSnake)

  return updateObject(state, {
    gameState: constants.GAME_OVER,
    freezeSnake: null
  })
}

const moveSnake = (state, action) => {
  let toUpdateProperties = {
    snake: action.snake
  }
  if (action.foodCell) {
    toUpdateProperties.foodCell = action.foodCell
  }
  return updateObject(state, toUpdateProperties)
}

const changeSnakeDirection = (state, action) => {
  return updateObject(state, {
    direction: action.direction
  })
}

const eatFood = (state, action) => {
  // Eating a food requires to generate a new food cell and update score
  return updateObject(state, {
    foodCell: action.foodCell,
    score: state.score + state.scoreAdder
  })
}

const levelUp = (state, action) => {
  // Defining the logic for levelling up

  // Decrease the timesInMillis (Increasing speed) by 50 points
  const snakeSpeed = state.snakeSpeed > 50 ? state.snakeSpeed - 50 : state.snakeSpeed

  // Increase the adder for score
  const scoreAdder = state.scoreAdder + 5

  clearInterval(state.freezeSnake)

  const freezeSnake = setInterval(() => {
    moveSnakeHelper()
  }, snakeSpeed)
  
  return updateObject(state, {
    snakeSpeed,
    scoreAdder,
    freezeSnake
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GAME_READY: return gameReady(state, action)
    case actionTypes.GAME_PLAYING: return gamePlaying(state, action)
    case actionTypes.GAME_PAUSED: return gamePaused(state, action)
    case actionTypes.GAME_OVER: return gameOver(state, action)
    case actionTypes.MOVE_SNAKE: return moveSnake(state, action)
    case actionTypes.CHANGE_SNAKE_DIRECTION: return changeSnakeDirection(state, action)
    case actionTypes.EAT_FOOD: return eatFood(state, action)
    case actionTypes.LEVEL_UP: return levelUp(state, action)
    default: return state
  }
}

export default reducer