import axios from 'axios'
const baseUrl = '/api/email'

const alert = async () => {
  const response = await axios.post(baseUrl)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { alert }