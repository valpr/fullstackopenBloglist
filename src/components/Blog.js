import React, {useState} from 'react'
const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeButton = () => {
    handleLike(blog)
  }

  const handleDeleteButton = () => {
    handleDelete(blog)
  }

  const deleteButton = () => (
    <button id="delete" onClick={handleDeleteButton}>delete</button>
  )

return(
  <div className="blog" style={blogStyle}>
    {blog.title} {blog.author} 
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
     <br/>
    <div className="toggle" style={{'display': visible ? '':'none'}}>
        {blog.url} <br/>
        <span className="likes">{blog.likes}</span> <button className="like" onClick={handleLikeButton}>like</button><br/>
        {blog.user.name}
        {blog.user.username === user.username ? deleteButton() : ''}
    </div>
  </div>
)}

export default Blog
