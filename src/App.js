import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, createBlog, deleteBlog } from './reducers/blogReducer'
import { logged, login, logout } from './reducers/userReducer'
import { newNote } from './reducers/noteReducer'
const App = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const message = useSelector(({notification}) => notification)
  const user = useSelector(({user})=> user)
  const blogs = useSelector (({blogs}) => blogs)

  useEffect(() => {
    console.log('effect runs')
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    dispatch(logged(JSON.parse(loggedUserJSON)))
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      console.log('wrong creds!')
      dispatch(newNote('Login failed, check credentials'))
    }
  }
  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = async (blogObject) => {    
    try{
      dispatch(createBlog(blogObject))
      dispatch(newNote(`${blogObject.title} by ${blogObject.author}`))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log('error creating blog: ', exception)
    }
  }

  const handleDelete = async (blogObject) => {
    try{
      if (window.confirm(`Are you sure you want to delete ${blogObject.title} by ${blogObject.author}`)){
        dispatch(deleteBlog(blogObject))
      }

    } catch (exception) {
      console.log('error deleting blog', exception)
    }
  }
  const handleLike = async (blogObject) => {
    try{
      dispatch(likeBlog(blogObject))
      
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