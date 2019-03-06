import * as actionTypes from './actionTypes'

export const gameStart = (payload) => {
  return {
    type: actionTypes.GAME_START,
    ...payload
  }
}