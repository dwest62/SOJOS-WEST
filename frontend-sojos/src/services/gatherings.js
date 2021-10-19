import axios from 'axios'
const baseUrl = '/api/gatherings'

let token = null

const setToken = (newToken) => {
  return(
    token = `bearer ${newToken}`)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`,newObject)
  return response.data
}

const rsvp = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}/rsvp`,newObject)
  return response.data
}

const deleteMeeting = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const comment = async (gathering, newComment) => {
  const comment = newComment
  const id = gathering.id
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const handleGuest = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/rsvp`, newObject)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll, create, setToken, update, 
  deleteMeeting, comment, rsvp, handleGuest }