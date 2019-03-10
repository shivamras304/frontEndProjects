import * as actionTypes from './actionTypes'

export const authSuccessful = () => {
  return {
    type: actionTypes.AUTH_SUCCESSFUL
  }
}

export const authFailed = () => {
  return {
    type: actionTypes.AUTH_FAILED
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
