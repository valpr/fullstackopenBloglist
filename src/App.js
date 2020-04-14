import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import DetailedUserView from './components/DetailedUserView'
import DetailedBlogView from './components/DetailedBlogView'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, createBlog, deleteBlog } from './reducers/blogReducer'
import { logged, login, logout } from './reducers/userReducer'
import { newNote } from './reducers/noteReducer'
import { Switch, Route, Link } from 'react-router-dom'
import userService from './services/users'

const App = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const message = useSelector(({notification}) => notification)
  const user = useSelector(({user})=> user)
  const blogs = useSelector (({blogs}) => blogs)
  const [userList, setUserList ]= useState([{blogs: 's', name:'a', id:'a'}])


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    dispatch(logged(JSON.parse(loggedUserJSON)))
  }, [dispatch])

  useEffect(() => {
    const getUsers = async () =>{
      const response = await userService.getAll()
      setUserList(response)
    }
    getUsers()
  }, [])

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
  const loggedIn = () => {
    return (
      <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in</p> 
      <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  const userView = () => { //iterate through blogs, add to user
    return (
      <div>
        <h3> Users</h3>
        <table>
        <tbody>

        <tr>
            <th>
              Name
            </th>
              <th>
                Blogs Created
              </th>
            </tr>
          {userList.map((user) => {
            return <tr key={user.id}>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td>
                        {user.blogs.length}
                      </td>
                    </tr>
          })}
          </tbody>
        </table>
      </div>
    )
  }


  const Menu = () => { // users, users id, normal view of app, blogs view, navigation menu
    const padding = {
      paddingRight:5
    }
    return (
      <div>
        <Link></Link>

      </div>
    )
  }

  return (
    <div>
      {user === null ? loginForm() : loggedIn()}

    <Switch>
      <Route path="/users/:id">
        <DetailedUserView userList={userList}/>
      </Route>
      <Route path="/users">
        {userView()}
      </Route>
      <Route path="/blogs/:id">
        <DetailedBlogView handleLike={handleLike} blogs={blogs}/>
      </Route>
      <Route path="/blogs">
      {user === null ? null : blogForm()}
      </Route>
    </Switch>
    </div>
  )
}

export default App