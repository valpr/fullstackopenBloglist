import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core'

const DetailedUserView = ({userList}) => {
    let { id } = useParams()

    const selected = userList.find(user => user.id === id)

    if (!selected) {
      return null
    }
    return ( //get params or useRouteMatch
      <div>
        <h2>{selected.name}</h2>
        <h3>added blogs</h3>
        <List>
          {selected.blogs.map((blog) => 
          <ListItem key={blog.id}>    
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
          </ListItem>)}
        </List>
      </div>
    )
  }

export default DetailedUserView