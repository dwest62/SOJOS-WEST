import gatheringService from "../services/gatherings"
import loginService from "../services/login"


const userReducer = (state = {user: null, notification: null}, action) => {
  switch(action.type) {
    case 'INIT_USER':
      return {user: action.data, notification:null}
    case 'LOGIN':
      return {user: action.data, notification:null}
    case 'LOGOUT':
      return {user: null, notification: null}
    case 'SET_ERROR':
      return {user:null, notification: action.data}
    case 'NULL_MESSAGE':
      return {...state, notification: null}
    default:
      return state
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedSojosappUser')
  return async dispatch => {
    const user = JSON.parse(loggedUserJSON)
    if(user){
      gatheringService.setToken(user.token)
    }
    dispatch({
      type: 'INIT_USER',
      data: user
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedSojosappUser', JSON.stringify(user)
      )
      gatheringService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (exception) {
      dispatch({
        type: 'SET_ERROR',
        data: 'invalid username and/or password'
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    await window.localStorage.setItem(
      'loggedSojosappUser', null
    )
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer