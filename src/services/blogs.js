import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewBlog = async (newBlog, user) => {
  const configHeaders = {
    headers: {
      'Authorization': `bearer ${user.token}`,
    }
  }
  const response = await axios.post(
    baseUrl,
    newBlog,
    configHeaders
  )
  return response.data
}

const forExport = { getAll, setToken, createNewBlog }

export default forExport