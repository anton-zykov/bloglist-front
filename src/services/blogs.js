import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
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
      Authorization: `bearer ${user.token}`,
    },
  }
  const response = await axios.post(baseUrl, newBlog, configHeaders)
  return response.data
}

const increaseLikes = async ({ title, author, url, likes, id }) => {
  const blogToSend = {
    title,
    author,
    url,
    likes: likes + 1,
  }

  const response = await axios.put(`${baseUrl}/${id}`, blogToSend)
  return response.data
}

const deleteBlog = async (id, user) => {
  const configHeaders = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, configHeaders)
  return response.data
}

const forExport = {
  getAll,
  setToken,
  createNewBlog,
  increaseLikes,
  deleteBlog,
}

export default forExport
