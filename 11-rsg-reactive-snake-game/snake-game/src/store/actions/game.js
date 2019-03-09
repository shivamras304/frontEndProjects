import * as actionTypes from './actionTypes'

export const gameReady = (payload) => {
  return {
    type: actionTypes.GAME_READY,
    ...payload
  }
}

export const gamePlaying = (payload) => {
  return {
    type: actionTypes.GAME_PLAYING,
    ...payload
  }
}

export const gamePaused = (payload) => {
  return {
    type: actionTypes.GAME_PAUSED,
    ...payload
  }
}

export const gameOver = (payload) => {
  return {
    type: actionTypes.GAME_OVER,
    ...payload
  }
}

export const moveSnake = (snake) => {
  return {
    type: actionTypes.MOVE_SNAKE,
    snake: snake
  }
}

export const changeSnakeDirection = (direction) => {
  return {
    type: actionTypes.CHANGE_SNAKE_DIRECTION,
    direction: direction
  }
}