import * as actionTypes from './actionTypes'

export const authSuccessful = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESSFUL,
    user: user
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
