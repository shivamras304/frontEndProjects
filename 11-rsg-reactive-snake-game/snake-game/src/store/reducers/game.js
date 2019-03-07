import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../utils/updateObject'
import * as constants from '../../utils/constants'

const initialState = {
  mRows: null,
  nCols: null,
  grid: null,
  foodCell: null,
  snake: null,
  direction: constants.UP,
}

const gameStart = (state, action) => {
  return updateObject(state, {
    mRows: action.mRows,
    nCols: action.nCols,
    grid: action.grid,
    foodCell: action.foodCell,
    snake: action.snake
  })
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GAME_START: return gameStart(state, action)
    default: return state
  }
}

export default reducer