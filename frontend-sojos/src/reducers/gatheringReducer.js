import gatheringService from "../services/gatherings"

const gatheringReducer = (state = null, action) => {
  switch(action.type) {
    case 'NEW_GATHERING':
      return [...state, action.data]
    case 'INIT_GATHERINGS':
      return action.data
    case 'DELETE_GATHERING':
      const newState = state.filter(data => data.id !== action.data.id)
      return newState
    case 'UPDATE_GATHERING':
      const gathId = action.data.id
      return state.map(data => data.id !== gathId ? data : action.data)
    case 'ADD_COMMENT':
      const idData = action.data.response.id
      const gatheringToUpdate = state.find(data => data.id === idData)
      gatheringToUpdate.comments = gatheringToUpdate.comments.concat(action.data.comment)
      return state.map(data => data.id !== idData ? data : gatheringToUpdate)
    case 'RSVP':
      const id = action.data.response.id
      const updatedGathering = state.find(data => data.id === id)
      updatedGathering.rsvp = action.data.response.rsvp
      return state.map(data => data.id !== id ? data : updatedGathering)
    case 'ADD_GUEST':
      const dataId = action.data.id
      const gathToUpdate = state.find(data => data.id === dataId)
      gathToUpdate.rsvp = action.data.rsvp
      return state.map(data => data.id !== dataId ? data : gathToUpdate)
    case 'REMOVE_GUEST':
      const ID = action.data.id
      const updatedGath = state.find(data => data.id === ID)
      updatedGath.rsvp = action.data.rsvp
      return state.map(data => data.id !== ID ? data : updatedGath)
    default:
      return state
  }
}

export const initializeGatherings = () => {
  return async dispatch => {
    const gatherings = await gatheringService.getAll()
    dispatch({
      type: 'INIT_GATHERINGS',
      data: gatherings
    })
  }
}

export const createGathering = (data, user) => {
  return async dispatch => {
    const gathering = await gatheringService.create(data)
    const newGathering = {
      ...gathering, user: { 
        id:gathering.user,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username 
      }
    }
    dispatch({
      type: 'NEW_GATHERING',
      data: newGathering
    })
  }
}

export const updateGathering = (id, data) => {
  return async dispatch => {
    const gathering = await gatheringService.update(id, data)
    const updatedGathering = {
      ...gathering, user: data.user
    }
    dispatch({
      type:'UPDATE_GATHERING',
      data: updatedGathering
    })
  }
}

export const deleteGatherings = (data) => {
  return async dispatch => {
    await gatheringService.deleteGathering(data.id)
    dispatch({
      type: 'DELETE_GATHERING',
      data: data,
    })
  }
}

export const addComment = (gathering, comment) => {
  return async dispatch => {
    const response = await gatheringService.comment(gathering, comment)
    dispatch({
      type:'ADD_COMMENT',
      data:{ response: response, comment: comment }
    })
  }
}

export const updateRSVP = ( gathering, rsvp, user ) => {
  return async dispatch => {
    const updatedGathering = {
      ...gathering, rsvp:{username: user.username, lastName:user.lastName, firstName: user.firstName, rsvp: rsvp}
    }

    const response = await gatheringService.rsvp(gathering.id, updatedGathering)
    
    dispatch({
      type:'RSVP',
      data: { response }
    })
  }
}

export const addGuest = ( gathering, guest) => {
  return async dispatch => {
    const updatedGathering = {
      ...gathering, 
      rsvp: gathering.rsvp
        .concat({
          username: 'guest', 
          lastName: guest.lastName,
          firstName: guest.firstName,
          rsvp:'true',
          kid: guest.kid
        })
    }
    const response = await gatheringService
      .handleGuest(gathering.id, updatedGathering)
    dispatch({
      type:'ADD_GUEST',
      data: response
    })
  }
}

export const removeGuest = (name, family, gathering) => {
  return async dispatch => {
    const updatedGathering = {...gathering, rsvp:
      gathering.rsvp.map(data =>
        data.username === 'guest'
          ? data.lastName === family
            ? data.firstName === name
              ? data = null
              : data
            : data
          : data
      ).filter(data => data !== null)
    }
    const response = await gatheringService.handleGuest(gathering.id, updatedGathering)
    dispatch({
      type:'REMOVE_GUEST',
      data: response
    })
  }
}

export default gatheringReducer