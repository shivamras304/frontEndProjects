import * as actionTypes from './actionTypes'

export const gameReady = (payload) => {
  return {
    type: actionTypes.GAME_READY,
    ...payload
  }
}

export const moveSnake = (snake) => {
  return {
    type: actionTypes.MOVE_SNAKE,
    snake: snake
  }
}