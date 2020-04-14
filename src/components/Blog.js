import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  // const handleDeleteButton = () => {
  //   handleDelete(blog)
  // }

  // const deleteButton = () => (
  //   <button id="delete" onClick={handleDeleteButton}>delete</button>
  // )

return(
  <div className="blog" style={blogStyle}>
    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
  </div>
)}

export default Blog
