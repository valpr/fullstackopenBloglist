import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addNewBlog = async (newBlog) =>{

  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const modifyLikes = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const modUrl = `${baseUrl}/${newBlog.id}`
  const response = await axios.put(modUrl, {...newBlog, likes: newBlog.likes+1, user: newBlog.user.id }, config)
  return response.data
}

const deleteBlog = async (deadBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const modUrl = `${baseUrl}/${deadBlog.id}`
  const response = await axios.delete(modUrl,config)
  return response.data
}

export default { getAll, setToken, addNewBlog, modifyLikes, deleteBlog }