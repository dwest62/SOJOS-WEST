
const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      return action.data.content
    case 'TIMEOUT':
      return null
    default:
      return state
  }
}

let timeoutID
export const message = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: { content }
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({type: 'TIMEOUT'})
    },timeout * 1000) //converts timeout input to seconds
  }
}

export default notificationReducer