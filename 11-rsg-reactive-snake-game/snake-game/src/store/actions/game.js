import * as actionTypes from './actionTypes'

export const gameReady = (payload) => {
  return {
    type: actionTypes.GAME_READY,
    ...payload
  }
}