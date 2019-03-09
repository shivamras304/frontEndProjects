import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../utils/updateObject'
import * as constants from '../../utils/constants'

const initialState = {
  gameState: constants.GAME_NULL,
  mRows: null,
  nCols: null,
  grid: null,
  foodCell: null,
  snake: null,
  direction: constants.UP,
}

const gameReady = (state, action) => {
  return updateObject(state, {
    gameState: constants.GAME_READY,
    mRows: action.mRows,
    nCols: action.nCols,
    grid: action.grid,
    foodCell: action.foodCell,
    snake: action.snake
  })
}

const moveSnake = (state, action) => {
  return updateObject(state, {
    snake: action.snake
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GAME_READY: return gameReady(state, action)
    case actionTypes.MOVE_SNAKE: return moveSnake(state, action)
    default: return state
  }
}

export default reducer