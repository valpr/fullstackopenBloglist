import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const blogFormRef = React.createRef()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const cuser = JSON.parse(loggedUserJSON)
      setUser(cuser)
      blogService.setToken(cuser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const tryLogin = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(tryLogin))
      setUser(tryLogin)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      console.log('wrong creds!')
      setMessage(
          `Login failed, check credentials`
      )
      setTimeout(() => setMessage(null), 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (blogObject) => {    
    try{
      blogService.setToken(user.token)
      const response = await blogService.addNewBlog(
        blogObject
      )
      console.log(response)
      setBlogs(blogs.concat(response))
      setMessage(`${response.title} by ${response.author}`)
      setTimeout(() => setMessage(null), 5000)

      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log('error creating blog: ', exception)
    }
  }

  const handleDelete = async (blogObject) => {
    try{
      if (window.confirm(`Are you sure you want to delete ${blogObject.title} by ${blogObject.author}`)){
        await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id ))
      }

    } catch (exception) {
      console.log('error deleting blog', exception)
    }
  }
  const handleLike = async (blogObject) => {
    try{
      setBlogs(
        blogs.map(blog => blog.id === blogObject.id ? {...blog, likes: blog.likes+1} : blog)
      )
      
      await blogService.modifyLikes(blogObject)
      
      //find changed blog
      // use set blog to change the blog
      //now just need to find blog in state and update (probably map)


    } catch (exception) {
      console.log('like error:', exception)
    }
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>

        <h2>Login to application</h2>
        <Notification message={message} />

        <div>
          username
          <input id="username" type="text"
          name="username" value={username} onChange={({target}) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input id="password" name="password"
          type="password" value={password} onChange={({target}) => setPassword(target.value)}
          ></input>
        </div>
        <button id="login-button" type="submit">Login</button>
      </div>
    </form>
  )


  const blogForm = () => (
    <div>
      <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in</p> 
      <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable ref={blogFormRef}>
        <BlogForm handleCreate={handleCreate} />
      </Togglable>
      {blogs
      .sort((blogA, blogB) => blogB.likes-blogA.likes )
      .map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App