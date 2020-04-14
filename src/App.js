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
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import userService from './services/users'
import { useField } from './hooks/useField'

import { AppBar, Toolbar, IconButton, Typography, 
  Table, TableContainer, TableRow, TableCell, 
  TableBody, TextField, Button } from '@material-ui/core'


const App = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')
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
      dispatch(login(username.forField.value, password.forField.value))
      username.reset()
      password.reset()
    } catch (exception) {
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
          <TextField autoComplete="username" key="username" id="username" label="Username"
          name="username" {...username.forField}
          ></TextField>
        </div>
        <div>
          <TextField autoComplete="current-password" key="password" label="Password" id="password" name="password"
          {...password.forField}
          ></TextField>
        </div>
        <Button id="login-button" type="submit">Login</Button>
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

  const userView = () => { //iterate through blogs, add to user
    return (
      <div>
        <h3> Users</h3>
        <TableContainer>
        <Table>
        <TableBody>
        <TableRow>
            <TableCell>
              Name
            </TableCell>
              <TableCell>
                Blogs Created
              </TableCell>
            </TableRow>
          {userList.map((user) => {
            return <TableRow key={user.id}>
                      <TableCell>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </TableCell>
                      <TableCell>
                        {user.blogs.length}
                      </TableCell>
                    </TableRow>
          })}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    )
  }


  const Menu = () => { // users, users id, normal view of app, blogs view, navigation menu
    return (
      <AppBar color='secondary' position="static">
        <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
    </IconButton>
    <Button component={Link} to="/blogs/" color="inherit">
      BLOGS
    </Button>
    <Button component={Link} to="/users/" color="inherit">
      USERS
    </Button>

    {user ? <Button  onClick={handleLogout}>Logout</Button> : null}
    <Typography  align="right" color="inherit" variant="h5">
    {user ?  `Welcome, ${user.name}` : 'Please login'}
    </Typography>
        </Toolbar>
      </AppBar>

    )
  }

  return (
    <div>
    <Menu/> 
    {user === null ? loginForm() : null}
 

    <Switch>
      <Route path="/users/:id">
        <DetailedUserView userList={userList}/>
      </Route>
      <Route path="/users">
        {userView() }
      </Route>
      <Route path="/blogs/:id">
        <DetailedBlogView handleLike={handleLike} blogs={blogs}/>
      </Route>
      <Route path="/blogs">
      {blogForm()}
      </Route>
      <Route path="/login" 
      render ={() => user ? null : <Redirect to="/blogs"/>} />
      <Route path="/" 
      render ={() => user ? <Redirect to="/blogs"/> : <Redirect to="/login"/>} />

    </Switch>
    </div>
  )
}

export default App